/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  basePath: '/rotrecovery',
  assetPrefix: '/rotrecovery/',
};

module.exports = nextConfig;
