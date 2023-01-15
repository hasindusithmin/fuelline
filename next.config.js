/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest:"public",
  register:true,
  skipWaiting:true,
  disable: process.env.NEXT_PUBLIC_ENVIROMENT === 'development'
})

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
})

module.exports = nextConfig