import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    minimumCacheTTL: 2592000,
  },
  compress: true,
  // Configuration expérimentale pour le cache et la restauration du scroll
  experimental: {
    scrollRestoration: true,
    staleTimes: {
      dynamic: 300, // cache les pages dynamiques pendant 5 min côté client
      static: 300,  // cache les pages statiques pendant 5 min côté client
    },
  },
};

export default nextConfig;
