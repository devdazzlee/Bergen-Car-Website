#!/usr/bin/env bash
# Bergen frontend VPS deploy — updates only /var/www/bergencar/frontend.
# Does not touch autosalesreviews, gbp-backend, or other nginx sites.
set -euo pipefail

APP_DIR="/var/www/bergencar/frontend"
SECRETS_DIR="/var/www/bergencar-secrets"
BRANCH="${DEPLOY_BRANCH:-master}"
LOCK_FILE="/tmp/bergen-frontend-deploy.lock"
PM2_NAME="bergen-car-web"

exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  echo "Another Bergen frontend deploy is in progress; waiting..."
  flock 9
fi

echo "==> Bergen frontend deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"

if [[ ! -d "$APP_DIR/.git" ]]; then
  echo "ERROR: $APP_DIR is not a git checkout"
  exit 1
fi

mkdir -p "$SECRETS_DIR"
[[ -f "$APP_DIR/.env.local" ]] && cp -a "$APP_DIR/.env.local" "$SECRETS_DIR/frontend.env.local"
[[ -f "$APP_DIR/.env.production" ]] && cp -a "$APP_DIR/.env.production" "$SECRETS_DIR/frontend.env.production"

cd "$APP_DIR"
git fetch --prune origin "$BRANCH"
git checkout -f -B "$BRANCH" "origin/$BRANCH"
git reset --hard "origin/$BRANCH"
git clean -fd -e node_modules -e .next -e .env.local -e .env.production

[[ -f "$SECRETS_DIR/frontend.env.local" ]] && cp -a "$SECRETS_DIR/frontend.env.local" "$APP_DIR/.env.local"
[[ -f "$SECRETS_DIR/frontend.env.production" ]] && cp -a "$SECRETS_DIR/frontend.env.production" "$APP_DIR/.env.production"

if [[ ! -f "$APP_DIR/.env.local" && ! -f "$APP_DIR/.env.production" ]]; then
  echo "ERROR: missing frontend env (expected $SECRETS_DIR/frontend.env.local or .env.production)"
  exit 1
fi

# Prefer .env.local for runtime; keep NEXT_PUBLIC_* in both for next build.
if [[ ! -f "$APP_DIR/.env.local" && -f "$APP_DIR/.env.production" ]]; then
  cp -a "$APP_DIR/.env.production" "$APP_DIR/.env.local"
fi

echo "==> npm ci @ $(git rev-parse --short HEAD)"
npm ci

echo "==> next build"
npm run build

reload_app() {
  if pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
    pm2 restart "$PM2_NAME" --update-env
  else
    pm2 start /var/www/bergencar/ecosystem.config.cjs --only "$PM2_NAME"
  fi
  pm2 save
}

reload_app
echo "==> Frontend healthy check"
sleep 2
curl -sf -m 15 "http://127.0.0.1:3001/" >/dev/null
echo "==> Bergen frontend deploy done $(date -u +%Y-%m-%dT%H:%M:%SZ)"
