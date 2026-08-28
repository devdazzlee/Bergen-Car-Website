import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://bergencarcompany.com";
const TITLE = "Bergen Car Company | Quality Used Cars in Lodi, New Jersey";
const DESCRIPTION =
  "Shop inspected, ready-to-drive used cars at Bergen Car Company in Lodi, NJ. Up-front pricing, financing through 12 lenders, honest trade-in offers, and a warranty on every vehicle. Serving Bergen County, Passaic County, and the greater NYC metro.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Bergen Car Company",
  },
  description: DESCRIPTION,
  applicationName: "Bergen Car Company",
  authors: [{ name: "Bergen Car Company" }],
  generator: "Next.js",
  keywords: [
    "used cars Lodi NJ",
    "used car dealership Lodi New Jersey",
    "Bergen Car Company",
    "pre-owned vehicles Bergen County",
    "car financing Lodi NJ",
    "bad credit car loans New Jersey",
    "trade in car appraisal NJ",
    "used SUVs trucks sedans near me",
    "certified used cars North Jersey",
    "buy here pay here alternative Lodi",
  ],
  category: "automotive",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Bergen Car Company",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&h=630&q=70",
        width: 1200,
        height: 630,
        alt: "Bergen Car Company showroom in Lodi, New Jersey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&h=630&q=70",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1424",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
