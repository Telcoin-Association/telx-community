/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "twitter.com",
      "pbs.twimg.com"
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            dimensions: false,
          },
        },
      ],
      type: "javascript/auto",
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
    });

    return config;
  },
}

module.exports = nextConfig
