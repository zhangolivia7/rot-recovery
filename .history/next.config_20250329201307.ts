import type { NextConfig } from "next";

const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  basePath: '/rotrecovery',
  assetPrefix: '/rotrecovery/',
};


export default nextConfig;
