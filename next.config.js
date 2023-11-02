/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL || 'https://jsonplaceholder.typicode.com',
  },
  reactStrictMode: true,
  images: {
    domains: ['flowbite.com'],
  },

};

module.exports = nextConfig;
