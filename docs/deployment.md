# Bergen Car — Deployment Guide

This project uses **two separate GitHub repos** and **two separate pipelines**.  
Pushing frontend code does **not** deploy the backend, and vice versa.

| App | Local folder | GitHub repo | Branch | Live URL |
| --- | --- | --- | --- | --- |
| **Frontend** (Next.js) | `Bergen Car Website/my-app` | [devdazzlee/Bergen-Car-Website](https://github.com/devdazzlee/Bergen-Car-Website) | `master` | https://bergen.187.77.19.146.sslip.io (temp) · point `bergenmotors.com` when ready |
| **Backend** (Express API) | `Bergen Car Website/backend` | [ahmedraza43577854-hub/Bergen-Car-Website-Backend](https://github.com/ahmedraza43577854-hub/Bergen-Car-Website-Backend) | `main` | https://bergen.backend-apis-dev.cloud |

Temp API fallback (still works): https://bergen-api.187.77.19.146.sslip.io  
Root `https://backend-apis-dev.cloud/` is **not** used for Bergen — only the `bergen.` subdomain.

---

## When do I deploy?

| You changed… | Deploy which? | What to do |
| --- | --- | --- |
| UI, pages, styles, SEO, frontend copy | **Frontend only** | Push `my-app` → `master` |
| API routes, Prisma, emails, inventory proxy, dashboard auth | **Backend only** | Push `backend` → `main` |
| Both (e.g. new API field + UI that uses it) | **Both** | Push **backend first**, then frontend |
| Only markdown / docs | **Nothing auto** | Docs are ignored by the workflow (`*.md`) |
| Env vars on the VPS | **Redeploy or restart** | Edit secrets on VPS, then redeploy (see below) |

You do **not** need to SSH into the VPS for normal code updates.  
Git push → GitHub Actions → VPS pull → build → PM2 restart.

---

## How automatic deploy works

```
Your PC  →  git push  →  GitHub Actions  →  SSH into VPS
                                              ↓
                                    git pull latest code
                                              ↓
                                    copy env from secrets folder
                                              ↓
                                    npm ci + build
                                              ↓
                                    pm2 restart that app only
```

- Frontend workflow: `.github/workflows/deploy-frontend.yml`
- Backend workflow: `.github/workflows/deploy-backend.yml` (in the backend repo)
- VPS apps: `bergen-car-web` (port `3001`) and `bergen-car-api` (port `4001`)
- Other sites on the same VPS (`autosalesreviews`, etc.) are **not** touched

---

## Example 1 — Frontend only

You fixed a button on the inventory page.

```bash
cd "d:/New folder/Bergen Car Website/my-app"

git status
git add .
git commit -m "Fix inventory filter button spacing"
git push origin master
```

Then:

1. Open https://github.com/devdazzlee/Bergen-Car-Website/actions  
2. Wait for **Deploy Frontend to VPS** → green check  
3. Open https://bergen.187.77.19.146.sslip.io and hard-refresh

---

## Example 2 — Backend only

You changed an API response or email template.

```bash
cd "d:/New folder/Bergen Car Website/backend"

git status
git add .
git commit -m "Update lead email subject line"
git push origin main
```

Then:

1. Open https://github.com/ahmedraza43577854-hub/Bergen-Car-Website-Backend/actions  
2. Wait for **Deploy Backend to VPS** → green check  
3. Test https://bergen.backend-apis-dev.cloud/health

---

## Example 3 — Both frontend and backend

You added a new API field and show it in the UI.

```bash
# 1) Backend first (so the API exists before the UI calls it)
cd "d:/New folder/Bergen Car Website/backend"
git add .
git commit -m "Add carfax url to inventory payload"
git push origin main

# 2) Then frontend
cd "d:/New folder/Bergen Car Website/my-app"
git add .
git commit -m "Show Carfax link on vehicle detail"
git push origin master
```

Wait for **both** Actions to finish (backend + frontend).

---

## Example 4 — Manual deploy (no new commit)

Use this if Actions failed, or you only changed env on the VPS.

**From GitHub (recommended):**

1. Repo → **Actions**  
2. Select **Deploy Frontend to VPS** or **Deploy Backend to VPS**  
3. Click **Run workflow** → choose branch → **Run workflow**

**From VPS SSH:**

```bash
# Frontend
/usr/local/bin/bergen-frontend-deploy

# Backend
/usr/local/bin/bergen-backend-deploy
```

---

## Env files on the VPS

Canonical secrets (edit these when values change):

```
/var/www/bergencar-secrets/frontend.env.local
/var/www/bergencar-secrets/frontend.env.production
/var/www/bergencar-secrets/backend.env
```

Each deploy copies them into:

```
/var/www/bergencar/frontend/.env.local
/var/www/bergencar/frontend/.env.production
/var/www/bergencar/backend/.env
```

### Frontend env (required)

| Key | Example |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | `https://bergen.backend-apis-dev.cloud` |

### Backend env (required)

| Key | Purpose |
| --- | --- |
| `PORT` | API port (`4001`) |
| `NODE_ENV` | `production` |
| `AUTOSALESREVIEWS_API_URL` | Inventory source API |
| `AUTOSALESREVIEWS_DEALER_SLUG` | Dealer slug |
| `INTERNAL_API_KEY` | Auth to AutoSalesReviews |
| `DATABASE_URL` | Postgres (Neon) |
| `EMAIL_HOST` / `EMAIL_PORT` / `EMAIL_USER` / `EMAIL_PASS` / `EMAIL_FROM` | SMTP |
| `ADMIN_EMAIL` | Lead notification recipients |
| `DASHBOARD_EMAIL` / `DASHBOARD_PASSWORD` / `DASHBOARD_SECRET` | Dashboard login |
| `CORS_ORIGIN` | Allowed frontend origins (must include live site URL) |

### After changing env on the VPS

```bash
# Option A — full redeploy (safest for NEXT_PUBLIC_* which is baked at build time)
/usr/local/bin/bergen-frontend-deploy
/usr/local/bin/bergen-backend-deploy

# Option B — backend-only quick reload (non-build secrets)
pm2 restart bergen-car-api --update-env
```

**Important:** If you change `NEXT_PUBLIC_API_URL`, you **must** rebuild the frontend (`bergen-frontend-deploy` or push frontend). Restart alone is not enough.

---

## Checklist before / after deploy

**Before push**

- [ ] You are in the correct folder (`my-app` vs `backend`)
- [ ] You are pushing the correct branch (`master` frontend / `main` backend)
- [ ] You did not commit `.env` secrets

**After push**

- [ ] GitHub Actions job is green
- [ ] Site or API URL loads
- [ ] For UI + API changes: both pipelines finished

Quick live checks:

```bash
curl -I https://bergen.187.77.19.146.sslip.io/
curl -s https://bergen.backend-apis-dev.cloud/health
```

---

## Common mistakes

| Mistake | What happens | Fix |
| --- | --- | --- |
| Push frontend changes to backend repo | Nothing useful / wrong place | Push from `my-app` to `Bergen-Car-Website` |
| Push to wrong branch (e.g. `main` on frontend) | Workflow may not run | Use `master` (FE) / `main` (BE) |
| Only edit code, never `git push` | Live site stays old | Commit + push |
| Change `NEXT_PUBLIC_API_URL` but only restart PM2 | Old API URL still baked in | Run frontend deploy / rebuild |
| Forget CORS when adding a new domain | Browser blocks API calls | Add domain to `CORS_ORIGIN`, redeploy backend |

---

## GitHub Actions secrets (already set once)

These exist on **both** repos under **Settings → Secrets and variables → Actions**:

- `VPS_HOST` — `187.77.19.146`
- `VPS_USER` — `root`
- `VPS_SSH_KEY` — deploy private key

If a deploy fails with SSH / auth errors, re-check these secrets.

---

## Summary (cheat sheet)

```text
Frontend change  →  cd my-app     →  git push origin master
Backend change   →  cd backend    →  git push origin main
Both             →  push backend first, then frontend
Watch status     →  GitHub → Actions
Live frontend    →  https://bergen.187.77.19.146.sslip.io  (or bergenmotors.com later)
Live API         →  https://bergen.backend-apis-dev.cloud
```
