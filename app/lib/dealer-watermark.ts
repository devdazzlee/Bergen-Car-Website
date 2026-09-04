import sharp from "sharp";

const INSPECT_TIMEOUT_MS = 8_000;
const RED_PIXEL_THRESHOLD = 40;

const inspected = new Map<string, boolean>();

function inspectionUrl(url: string): string {
  const marker = "/image/upload/";
  const at = url.indexOf(marker);
  if (at === -1) return url;
  const after = url.slice(at + marker.length);
  if (/^(w_|c_|h_|f_|q_|e_)/.test(after)) return url;
  return `${url.slice(0, at + marker.length)}w_400,c_limit,q_80/${after}`;
}

function topRightHasDealerRed(
  data: Buffer,
  width: number,
  height: number,
  channels: number,
): boolean {
  const left = Math.floor(width * 0.7);
  const bottom = Math.max(1, Math.floor(height * 0.28));
  let red = 0;

  for (let y = 0; y < bottom; y++) {
    for (let x = left; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i] ?? 0;
      const g = data[i + 1] ?? 0;
      const b = data[i + 2] ?? 0;
      if (r >= 88 && r > g + 22 && r > b + 22) red += 1;
      if (red >= RED_PIXEL_THRESHOLD) return true;
    }
  }

  return false;
}

async function fetchBuffer(url: string): Promise<Buffer | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), INSPECT_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      cache: "force-cache",
      headers: { Accept: "image/*" },
    });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/** True when the Bergen dealer overlay is visible in the top-right. */
export async function photoHasDealerWatermark(url: string): Promise<boolean> {
  const cached = inspected.get(url);
  if (cached !== undefined) return cached;

  const buf = await fetchBuffer(inspectionUrl(url));
  if (!buf) return true;

  try {
    const { data, info } = await sharp(buf)
      .resize(320, 240, { fit: "inside" })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const watermarked = topRightHasDealerRed(
      data,
      info.width,
      info.height,
      info.channels,
    );
    inspected.set(url, watermarked);
    return watermarked;
  } catch {
    return true;
  }
}

const POOL = 4;

/**
 * First gallery URL whose top-right is not stamped with the dealer overlay.
 * Returns null when every photo is watermarked or none can be inspected.
 */
export async function firstPhotoWithoutDealerWatermark(
  urls: string[],
): Promise<string | null> {
  if (urls.length === 0) return null;
  if (!(await photoHasDealerWatermark(urls[0]!))) return urls[0]!;

  for (let i = 1; i < urls.length; i += POOL) {
    const batch = urls.slice(i, i + POOL);
    const flags = await Promise.all(
      batch.map((url) => photoHasDealerWatermark(url)),
    );
    const hit = flags.findIndex((watermarked) => !watermarked);
    if (hit !== -1) return batch[hit] ?? null;
  }

  return null;
}
