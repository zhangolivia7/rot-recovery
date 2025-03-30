import type { NextConfig } from "next";

const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  basePath: '/rot-recovery',
  assetPrefix: '/rot-recovery/',
};


export default nextConfig;
