import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["reprint-presently-makes-dealers.trycloudflare.com"],
  transpilePackages: ["@twa-dev/sdk"],
};

export default nextConfig;
