/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      // add an image from a different domain: https://ipc1proyecto2202300376backend-production.up.railway.app
      {
        protocol: "https",
        hostname: "ipc1proyecto2202300376backend-production.up.railway.app",
      },
    ],
    domains: ["ipc1proyecto2202300376backend-production.up.railway.app"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
