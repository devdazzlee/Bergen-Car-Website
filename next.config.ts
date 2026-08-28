import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // High-res dealership/vehicle photography is served from Unsplash and
    // optimized on the fly by Next.js (resized + WebP/AVIF, quality 75).
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
    ],
  },
};

export default nextConfig;
