/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for Netlify deployment
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  
  // Reduce worker threads to prevent Jest worker issues
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  
  // Add webpack configuration for better performance
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Reduce memory pressure
      config.optimization = {
        ...config.optimization,
        minimize: false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;