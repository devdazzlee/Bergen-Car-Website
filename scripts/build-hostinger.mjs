/**
 * Builds a static export and packages it into output/ for Hostinger upload.
 * Each run replaces the previous output (no old zips or duplicates).
 * Run: yarn build
 */
import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");
const outputDir = path.join(root, "output");
const siteDir = path.join(outputDir, "site");
const zipName = "bergen-car-website.zip";
const zipPath = path.join(outputDir, zipName);

function run(cmd, args) {
  const result = spawnSync(cmd, args, { cwd: root, stdio: "inherit", shell: true });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function zipOutFolder() {
  const tarResult = spawnSync(
    "tar",
    ["-a", "-c", "-f", path.join("output", zipName), "-C", "out", "."],
    { cwd: root, stdio: "inherit" }
  );
  if (tarResult.status === 0) {
    return;
  }

  if (process.platform === "win32") {
    const ps = `Compress-Archive -Path '${outDir}\\*' -DestinationPath '${zipPath}' -Force`;
    run("powershell", ["-NoProfile", "-Command", ps]);
    return;
  }

  const zipResult = spawnSync("zip", ["-r", zipPath, "."], {
    cwd: outDir,
    stdio: "inherit",
  });
  if (zipResult.status !== 0) {
    process.exit(zipResult.status ?? 1);
  }
}

console.log("\n▶ Building static site (next build)…\n");
run("yarn", ["next", "build"]);

if (!existsSync(outDir)) {
  console.error("Build finished but out/ folder was not created.");
  process.exit(1);
}

if (existsSync(outputDir)) {
  rmSync(outputDir, { recursive: true, force: true });
}
mkdirSync(outputDir, { recursive: true });
cpSync(outDir, siteDir, { recursive: true });

console.log("\n▶ Creating zip for Hostinger…\n");
zipOutFolder();

rmSync(outDir, { recursive: true, force: true });

const countFiles = (dir) => {
  let n = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) n += countFiles(full);
    else n += 1;
  }
  return n;
};

const zipSizeMb = (statSync(zipPath).size / (1024 * 1024)).toFixed(2);

console.log("\n✓ Build complete — ready for Hostinger\n");
console.log(`  Upload folder:  output/site/  (${countFiles(siteDir)} files)`);
console.log(`  Zip archive:    output/${zipName}  (${zipSizeMb} MB)\n`);
