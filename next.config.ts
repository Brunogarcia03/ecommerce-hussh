import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "i.imgur.com" },
      { hostname: "placeimg.com" },
      { hostname: "concepto.de" },
    ],
  },
};

export default nextConfig;
