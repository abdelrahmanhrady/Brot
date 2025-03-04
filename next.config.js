/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}
module.exports = {
  images: {
    domains: ['your-image-host.com'], // Add any image hosts you use
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
