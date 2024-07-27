// Import necessary modules
import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache';

// Define your Next.js configuration with PWA capabilities
/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  // Set your PWA configurations
  pwa: {
    dest: 'public', // The output directory for service worker files
    runtimeCaching, // Utilize predefined caching strategies
    disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode
  },

  // Optimize images with the Next.js built-in image optimizer
  images: {
    domains: ['utfs.io'], // Replace with your image domains
  },

  // Customize the Webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false; // Fallback for fs module on client side
    }
    return config;
  },

  // Set up environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // Example environment variable
  },

  // Enable React Strict Mode
  reactStrictMode: true,

  // Define custom headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
          { key: 'Permissions-Policy', value: 'geolocation=(self)' },
        ],
      },
    ];
  },
});

export default nextConfig;
