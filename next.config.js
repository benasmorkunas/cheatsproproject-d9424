/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for Netlify deployment with Next.js runtime
  trailingSlash: true,
  
  // Configure images for Netlify
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  
  // Reduce worker threads to prevent Jest worker issues
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  
  // Disable SWC minifier to prevent worker issues
  swcMinify: false,
  
  // Add webpack configuration for better performance
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Reduce memory pressure
      config.optimization = {
        ...config.optimization,
        minimize: false,
      };
      
      // Exclude test files from processing
      config.watchOptions = {
        ignored: [
          '**/node_modules/**',
          '**/__tests__/**',
          '**/*.test.*',
          '**/*.spec.*'
        ]
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;