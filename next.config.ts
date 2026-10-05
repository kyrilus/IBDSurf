import type { NextConfig } from "next";

const shopifyImageHostname = process.env.SHOPIFY_IMAGE_HOSTNAME;

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,
  turbopack: {
    root: process.cwd(),
  },
  images: shopifyImageHostname
    ? {
        remotePatterns: [
          {
            protocol: "https",
            hostname: shopifyImageHostname,
          },
        ],
      }
    : undefined,
};

export default nextConfig;
