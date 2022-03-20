/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "twitter.com",
      "pbs.twimg.com"
    ],
  },
}

module.exports = nextConfig
