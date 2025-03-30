/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  basePath: '/rot-recovery',
  assetPrefix: '/rot-recovery/',
};

module.exports = nextConfig;
