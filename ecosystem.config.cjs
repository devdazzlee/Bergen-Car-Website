/**
 * PM2 process file for Bergen Car on the VPS.
 * Does not manage autosalesreviews / gbp-backend / other apps.
 */
module.exports = {
  apps: [
    {
      name: "bergen-car-api",
      cwd: "/var/www/bergencar/backend",
      script: "dist/index.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "4001",
      },
      max_memory_restart: "512M",
    },
    {
      name: "bergen-car-web",
      cwd: "/var/www/bergencar/frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001 -H 127.0.0.1",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3001",
      },
      max_memory_restart: "768M",
    },
  ],
};
