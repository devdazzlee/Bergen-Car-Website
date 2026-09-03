/**
 * Captures screenshots of all 15 category landing pages and builds a PDF
 * matching the client walkthrough format. Requires `yarn dev` running.
 *
 * Run: yarn docs:category-pdf
 */
import { chromium } from "playwright";
import {
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = path.join(root, "docs");
const tmpDir = path.join(root, ".tmp", "category-screenshots");
const pdfPath = path.join(
  docsDir,
  "Bergen Car Company - Category Pages (Current UI).pdf"
);

const DEV_BASE = process.env.DEV_URL ?? "http://localhost:3000";
const LIVE_SITE = "bergencarcompany.com";

const CATEGORIES = [
  { permalink: "/used-suvs-lodi-nj", h1: "Used SUVs in Lodi, NJ" },
  { permalink: "/used-sedans-lodi-nj", h1: "Used Sedans in Lodi, NJ" },
  {
    permalink: "/used-pickup-trucks-lodi-nj",
    h1: "Used Pickup Trucks in Lodi, NJ",
  },
  { permalink: "/used-minivans-lodi-nj", h1: "Used Minivans in Lodi, NJ" },
  { permalink: "/used-cargo-vans-lodi-nj", h1: "Used Cargo Vans in Lodi, NJ" },
  {
    permalink: "/used-passenger-vans-lodi-nj",
    h1: "Used Passenger Vans in Lodi, NJ",
  },
  {
    permalink: "/used-commercial-vehicles-lodi-nj",
    h1: "Used Commercial Vehicles in Lodi, NJ",
  },
  { permalink: "/used-police-cars-lodi-nj", h1: "Used Police Cars in Lodi, NJ" },
  { permalink: "/used-coupes-lodi-nj", h1: "Used Coupes in Lodi, NJ" },
  {
    permalink: "/used-hatchbacks-lodi-nj",
    h1: "Used Hatchbacks in Lodi, NJ",
  },
  {
    permalink: "/used-convertibles-lodi-nj",
    h1: "Used Convertibles in Lodi, NJ",
  },
  { permalink: "/used-wagons-lodi-nj", h1: "Used Wagons in Lodi, NJ" },
  {
    permalink: "/used-luxury-cars-lodi-nj",
    h1: "Used Luxury Cars in Lodi, NJ",
  },
  {
    permalink: "/used-hybrid-vehicles-lodi-nj",
    h1: "Used Hybrid Vehicles in Lodi, NJ",
  },
  {
    permalink: "/used-electric-vehicles-lodi-nj",
    h1: "Used Electric Vehicles in Lodi, NJ",
  },
];

const preparedDate = new Date().toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildTocItem(cat, index, pageNum) {
  return `<div class="toc-item">
    <div class="toc-badge">${index + 1}</div>
    <div class="toc-copy">
      <div class="toc-title">${escapeHtml(cat.h1)}</div>
      <div class="toc-path">${escapeHtml(cat.permalink)}/</div>
    </div>
    <div class="toc-page">${pageNum}</div>
  </div>`;
}

function buildHtml(screenshots) {
  const leftToc = CATEGORIES.slice(0, 8)
    .map((cat, index) => buildTocItem(cat, index, index + 3))
    .join("\n");
  const rightToc = CATEGORIES.slice(8)
    .map((cat, index) => buildTocItem(cat, index + 8, index + 11))
    .join("\n");

  const categoryPages = screenshots
    .map((shot, index) => {
      const cat = CATEGORIES[index];
      const liveUrl = `https://${LIVE_SITE}${cat.permalink}/`;
      return `<section class="page cat-page">
        <div class="cat-meta">
          <span>CATEGORY PAGE ${index + 1} OF ${CATEGORIES.length}</span>
          <span>${LIVE_SITE}</span>
        </div>
        <h2>${escapeHtml(cat.h1)}</h2>
        <p class="cat-path">${escapeHtml(cat.permalink)}/</p>
        <p class="cat-url">${escapeHtml(liveUrl)}</p>
        <div class="shot-wrap">
          <img src="data:image/png;base64,${shot}" alt="${escapeHtml(cat.h1)}" />
        </div>
        <footer class="cat-footer">
          <span>Bergen Car Company, Vehicle Category Landing Pages</span>
          <span>${index + 3}</span>
        </footer>
      </section>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Bergen Car Company — Category Pages</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    @page { size: letter; margin: 0; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, "Segoe UI", Arial, sans-serif;
      color: #0e101c;
      background: #fff;
    }
    .page {
      width: 8.5in;
      height: 11in;
      page-break-after: always;
      position: relative;
      overflow: hidden;
    }

    /* Cover — matches original PDF */
    .cover {
      background: #161920;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 0.85in 0.9in;
    }
    .cover .top-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      background: #e11d2e;
    }
    .cover .brand-red {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.34em;
      color: #e11d2e;
      margin: 0;
    }
    .cover .brand-white {
      margin: 0.35rem 0 0;
      font-size: 10px;
      letter-spacing: 0.34em;
      text-transform: uppercase;
      color: #fff;
      font-weight: 500;
    }
    .cover .brand-line {
      width: 2.4in;
      height: 1px;
      background: #f4b740;
      margin: 0.55rem auto 1.35rem;
    }
    .cover h1 {
      margin: 0;
      font-size: 30px;
      line-height: 1.15;
      font-weight: 700;
      max-width: 5.8in;
    }
    .cover .status {
      margin: 0.75rem 0 1.35rem;
      font-size: 13px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #f4b740;
      font-weight: 600;
    }
    .cover .desc {
      margin: 0;
      max-width: 4.8in;
      font-size: 11px;
      line-height: 1.75;
      color: #8c8f98;
    }
    .cover .site {
      position: absolute;
      bottom: 1.05in;
      left: 0;
      right: 0;
      font-size: 10px;
      color: #8c8f98;
    }
    .cover .date {
      position: absolute;
      bottom: 0.72in;
      left: 0;
      right: 0;
      font-size: 10px;
      color: #8c8f98;
    }

    /* Contents — two columns, red badges */
    .toc {
      padding: 0.72in 0.72in 0.55in;
    }
    .toc h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: #0e101c;
    }
    .toc .rule {
      width: 1.15in;
      height: 3px;
      background: #e11d2e;
      margin: 0.45rem 0 0.65rem;
    }
    .toc .lead {
      margin: 0 0 0.85rem;
      font-size: 10px;
      color: #8c8f98;
    }
    .toc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 0.45in;
    }
    .toc-col {
      display: flex;
      flex-direction: column;
    }
    .toc-item {
      display: grid;
      grid-template-columns: 24px 1fr auto;
      gap: 0.4rem;
      align-items: start;
      margin-bottom: 0.62rem;
    }
    .toc-badge {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #e11d2e;
      color: #fff;
      font-size: 9px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1px;
    }
    .toc-title {
      font-size: 10px;
      font-weight: 700;
      color: #0e101c;
      line-height: 1.35;
    }
    .toc-path {
      margin-top: 0.1rem;
      font-size: 8px;
      color: #8c8f98;
      line-height: 1.3;
    }
    .toc-page {
      font-size: 9px;
      color: #8c8f98;
      padding-top: 2px;
    }

    /* Category pages — dark frame, full screenshot scaled to fit */
    .cat-page {
      background: #161920;
      display: flex;
      flex-direction: column;
      padding: 0.42in 0.42in 0.3in;
    }
    .cat-meta {
      display: flex;
      justify-content: space-between;
      font-size: 8px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #f4b740;
      margin-bottom: 0.28rem;
    }
    .cat-meta span:last-child {
      color: #8c8f98;
      letter-spacing: 0.04em;
      text-transform: none;
    }
    .cat-page h2 {
      margin: 0;
      font-size: 17px;
      font-weight: 700;
      color: #fff;
      line-height: 1.2;
    }
    .cat-path {
      margin: 0.18rem 0 0;
      font-size: 8px;
      color: #f4b740;
    }
    .cat-url {
      margin: 0.12rem 0 0.28rem;
      font-size: 7px;
      color: #666b78;
    }
    .shot-wrap {
      flex: 1;
      min-height: 0;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 0.08in 0;
    }
    .shot-wrap img {
      display: block;
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 2px;
      box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
    }
    .cat-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.22rem;
      padding-top: 0.2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 8px;
      color: #8c8f98;
    }
  </style>
</head>
<body>
  <section class="page cover">
    <div class="top-bar"></div>
    <p class="brand-red">BERGEN</p>
    <p class="brand-white">CAR COMPANY, INC.</p>
    <div class="brand-line"></div>
    <h1>Vehicle Category<br />Landing Pages</h1>
    <p class="status">Finished Live — 15 Pages</p>
    <p class="desc">Live site walkthrough of every vehicle category page,<br />each built with unique content, live inventory feeds, and working filters.</p>
    <div class="site">${LIVE_SITE}</div>
    <div class="date">Prepared ${preparedDate}</div>
  </section>

  <section class="page toc">
    <h2>Contents</h2>
    <div class="rule"></div>
    <p class="lead">${CATEGORIES.length} category pages, live now on the Bergen Car Company website.</p>
    <div class="toc-grid">
      <div class="toc-col">${leftToc}</div>
      <div class="toc-col">${rightToc}</div>
    </div>
  </section>

  ${categoryPages}
</body>
</html>`;
}

async function captureScreenshots(browser) {
  const page = await browser.newPage({
    viewport: { width: 1400, height: 900 },
    deviceScaleFactor: 1,
  });

  const shots = [];

  for (const cat of CATEGORIES) {
    const url = `${DEV_BASE}${cat.permalink}`;
    process.stdout.write(`  • ${cat.h1}\n`);
    await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
    await page.evaluate(async () => {
      const images = Array.from(document.images);
      await Promise.all(
        images.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                img.addEventListener("load", resolve, { once: true });
                img.addEventListener("error", resolve, { once: true });
              })
        )
      );
    });

    const file = path.join(tmpDir, `${cat.permalink.replace(/\//g, "_")}.png`);
    await page.screenshot({ path: file, fullPage: true });
    shots.push(readFileSync(file).toString("base64"));
  }

  await page.close();
  return shots;
}

async function main() {
  console.log("\n▶ Capturing category page screenshots from", DEV_BASE, "\n");

  rmSync(tmpDir, { recursive: true, force: true });
  mkdirSync(tmpDir, { recursive: true });
  mkdirSync(docsDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  try {
    const screenshots = await captureScreenshots(browser);

    console.log("\n▶ Building PDF…\n");
    const html = buildHtml(screenshots);
    const htmlPath = path.join(tmpDir, "report.html");
    writeFileSync(htmlPath, html);

    const page = await browser.newPage();
    await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`, {
      waitUntil: "networkidle",
    });
    await page.waitForTimeout(500);
    await page.pdf({
      path: pdfPath,
      format: "Letter",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    await page.close();
  } finally {
    await browser.close();
    rmSync(tmpDir, { recursive: true, force: true });
  }

  console.log("✓ PDF saved:", pdfPath, "\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
