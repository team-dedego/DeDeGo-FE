import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import withPWA from "next-pwa";

const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: ({ hash }) => `dedego_${hash}`,
});

const isDev = process.env.NODE_ENV === "development";

const nextConfig = withPWA({
  dest: "public",
  disable: isDev, 
})({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://dedego.yuuka.me/api",
      },
    ],
  },
}) as NextConfig;

export default withVanillaExtract(nextConfig);