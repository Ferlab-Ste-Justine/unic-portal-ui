/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: 'standalone', // Optimized for deployment on Docker
};

module.exports = nextConfig;
