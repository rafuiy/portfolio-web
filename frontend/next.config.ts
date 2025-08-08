/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    images: {
    domains: ['portfolio-prod.up.railway.app'], // tambahkan ini
    },
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
