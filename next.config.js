/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for Netlify deployment with Next.js runtime
  trailingSlash: true,
  
  // Configure images for Netlify
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  
  // Completely disable worker threads and force single-threaded compilation
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  
  // Move server components external packages to correct location
  serverExternalPackages: [],
  
  // Disable minification to prevent worker issues
  compiler: {
    removeConsole: false,
  },
  
  // Add webpack configuration for better performance and stability
  webpack: (config, { dev, isServer }) => {
    // Force single-threaded webpack compilation
    config.parallelism = 1;
    
    if (dev) {
      // Reduce memory pressure
      config.optimization = {
        ...config.optimization,
        minimize: false,
        splitChunks: false,
      };
      
      // Disable caching to prevent worker issues
      config.cache = false;
      
      // Reduce file watching pressure
      config.watchOptions = {
        ignored: [
          '**/node_modules/**',
          '**/__tests__/**',
          '**/*.test.*',
          '**/*.spec.*',
          '**/.git/**',
          '**/dist/**',
          '**/build/**'
        ],
        poll: 1000,
        aggregateTimeout: 300
      };
      
      // Limit concurrency
      config.infrastructureLogging = {
        level: 'error'
      };
    }
    
    // Disable thread-loader if present
    config.module.rules.forEach(rule => {
      if (rule.use && Array.isArray(rule.use)) {
        rule.use = rule.use.filter(loader => 
          typeof loader === 'string' ? !loader.includes('thread-loader') : 
          !loader?.loader?.includes('thread-loader')
        );
      }
    });
    
    return config;
  },
};

module.exports = nextConfig;