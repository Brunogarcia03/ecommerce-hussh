import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "i.imgur.com" },
      { hostname: "placeimg.com" },
      { hostname: "concepto.de" },
    ],
  },
};

export default module.exports = withBundleAnalyzer(nextConfig);
