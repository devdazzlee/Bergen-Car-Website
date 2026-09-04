import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Static HTML export for Hostinger / any static file hosting. */
  output: "export",
  serverExternalPackages: ["sharp"],
  images: {
    // Required for static export — images are served as-is from the CDN URLs.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
