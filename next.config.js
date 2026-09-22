/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Experimental: reduce unused JS
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

module.exports = nextConfig;
