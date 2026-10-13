import type { NextConfig } from "next";

const squareImageHostname =
  process.env.SQUARE_IMAGE_HOSTNAME ??
  "items-images-production.s3.us-west-2.amazonaws.com";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: squareImageHostname,
      },
    ],
  },
};

export default nextConfig;
