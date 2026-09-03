/**
 * Single origin for the Bergen API. Host-agnostic: local, CI, Vercel,
 * Hostinger, or any other runner all read NEXT_PUBLIC_API_URL.
 *
 * next dev  → optional; defaults to http://localhost:4001
 * next build (NODE_ENV=production) → NEXT_PUBLIC_API_URL is required
 *   and must not be localhost (use .env.production, not .env.local).
 */
export function resolveApiBase(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/+$/, "");
  const production = process.env.NODE_ENV === "production";

  if (production) {
    if (!configured) {
      throw new Error(
        "NEXT_PUBLIC_API_URL is required for production builds. Set it to the public Bergen API origin (https://...), then rebuild.",
      );
    }
    if (isLoopback(configured)) {
      throw new Error(
        "NEXT_PUBLIC_API_URL cannot be localhost in a production build. The static site is compiled against a public API.",
      );
    }
    return configured;
  }

  return configured || "http://localhost:4001";
}

function isLoopback(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "[::1]" ||
      hostname === "::1"
    );
  } catch {
    return false;
  }
}
