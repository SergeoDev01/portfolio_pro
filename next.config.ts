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
  // Désactiver le scroll automatique vers le haut lors des navigations
  // afin de laisser notre logique manuelle (sessionStorage) prendre le relais
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
