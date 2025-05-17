import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  experimental: {
    turbo: {
      resolveAlias: {
        '@': './src'
      }
    }
  }
};

export default nextConfig;
