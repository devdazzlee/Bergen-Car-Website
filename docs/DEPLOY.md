# VPS deploy (Bergen Car)

Live site (temporary domains):

- Frontend: https://bergen.187.77.19.146.sslip.io
- API: https://bergen-api.187.77.19.146.sslip.io

## How deploys work

Separate pipelines — push to each repo updates only that app on the VPS:

| Repo | Branch | Workflow | VPS path | PM2 process |
| --- | --- | --- | --- | --- |
| `Bergen-Car-Website` | `master` | `.github/workflows/deploy-frontend.yml` | `/var/www/bergencar/frontend` | `bergen-car-web` (`next start` :3001) |
| `Bergen-Car-Website-Backend` | `main` | `.github/workflows/deploy-backend.yml` | `/var/www/bergencar/backend` | `bergen-car-api` (:4001) |

Existing VPS apps (`autosalesreviews`, `gbp-backend`) are not touched.

## GitHub Actions secrets (required once)

Add the same three secrets on **both** repos → Settings → Secrets and variables → Actions:

- `VPS_HOST` = `187.77.19.146`
- `VPS_USER` = `root`
- `VPS_SSH_KEY` = contents of the deploy private key (ed25519)

After secrets are set, every push rebuilds and reloads that app automatically. You can also run the workflow manually (Actions → Deploy → Run workflow).

## Env files on the VPS

Stored under `/var/www/bergencar-secrets/` and copied into the app dirs on each deploy:

- `frontend.env.local` / `frontend.env.production` — at least `NEXT_PUBLIC_API_URL`
- `backend.env` — `PORT`, `DATABASE_URL`, `INTERNAL_API_KEY`, SMTP, dashboard, `CORS_ORIGIN`, etc.

Edit the secret files on the VPS, then redeploy (or `pm2 restart … --update-env`).

## Manual deploy on the VPS

```bash
/usr/local/bin/bergen-frontend-deploy
/usr/local/bin/bergen-backend-deploy
```
