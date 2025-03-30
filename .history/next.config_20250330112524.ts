const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/rotrecovery' : '',
  assetPrefix: isProd ? '/rotrecovery/' : '',
};

export default nextConfig;