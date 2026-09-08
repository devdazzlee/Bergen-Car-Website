import Link from "next/link";
import RedirectOnMount from "./redirect-on-mount";

/**
 * Stands in for a 301 on the old `/inventory/<database-id>/` URLs.
 *
 * A static export has no server, so `next.config` redirects and `redirect()`
 * are both unavailable — the old URL is emitted as a real page that sends the
 * visitor on. The zero-delay meta refresh covers crawlers and JS-less clients
 * (Google treats it as a permanent redirect); `RedirectOnMount` handles it
 * client-side without leaving a dead entry in the back button. The canonical
 * tag pointing at the slugged URL comes from the page's `generateMetadata`.
 */
export default function LegacyUrlRedirect({
  to,
  name,
}: {
  to: string;
  name: string;
}) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <RedirectOnMount to={to} />
      <main className="flex flex-1 items-center justify-center px-6 py-24 text-center">
        <div>
          <p className="text-sm text-navy-600">
            This listing has moved to a new address.
          </p>
          <Link
            href={to}
            className="mt-3 inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
          >
            Continue to the {name}
          </Link>
        </div>
      </main>
    </>
  );
}
