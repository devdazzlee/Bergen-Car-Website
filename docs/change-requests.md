# Bergen Site — Change Request Tracker

Running list of what Richie has asked for, with scope notes. Update as new
asks come in and as items ship.

Scope column:
- **fix** = finishing / correcting the delivered build (not new billable work)
- **new** = new feature or work outside the original build (confirm billable with Richie)

---

## Batch 1 — 2026-09-10 (WhatsApp)

| # | Request | Scope | Status | Notes |
|---|---------|-------|--------|-------|
| 1 | Remove the sold 2025 Ram ProMaster (`2025-ram-promaster-2500-high-roof-zupq47`) and any other sold cars from the site | fix | open | Live data already has it inactive; site needs a rebuild/redeploy to catch up |
| 2 | Update inventory to current cars and keep it current (asked twice) | fix / new | backend done, deploy pending | **Backend done** in AutoSalesReviews `backend`: new `AutoDevClient` bound to Bergen's own key (`BERGEN_AUTODEV_API_KEY=sk_ad_i6bR9QE-...`), dedicated `inventory-bergen` cron every 30 min 08:00–20:30 ET Mon–Sat, data-only (photos via existing catch-up cron), overlap guard, manual trigger `POST /jobs/bergen-inventory-sync`. ~625 req/mo, fits the 1000 quota. **Still pending:** the storefront itself needs to pull on the same cycle — either a scheduled `build:hostinger` + redeploy, or move Bergen `my-app` to a Node/ISR deploy on the VPS. |
| 3 | Engine spec cut off with "…" on vehicle detail page | fix | done | Removed `truncate`; values wrap with `break-words` |
| 4 | Transmission spec cut off with "…" on vehicle detail page | fix | done | Same as #3 |
| 5 | Efficiency line blank on vehicle detail page | fix | done | Empty/blank/undefined specs filtered out before render |
| 6 | Take the site offline / work on it offline | fix | open | Confirm: maintenance page vs staging link + relaunch bar |
| 7 | Add $890 documentation fee to pricing ("very important") | new | done | `DOC_FEE = 890` in `app/lib/inventory.ts` |
| 8 | Pricing breakdown: unit price → doc fee → out-the-door price | new | done | Detailed Pricing box on vehicle detail page |
| 9 | Fix all "no fees" / "no hidden fees" wording across the site | new | done | See chat for full file/line list; $499 → $890 site-wide |

Richie also said "I will give you more updates" — more expected.

---

## Open questions for Richie

- Pricing breakdown: on listing cards too, or vehicle detail pages only?
- Offline: maintenance page for visitors, or leave live and iterate on a staging link? What has to be right before it goes back to normal?

## Billing note

Items 7–9 (and the auto-sync + staging workflow under 2 and 6) are new scope beyond
"build the website." Line these up as billable when delivering; items 1–5 are
finishing the delivered build.
