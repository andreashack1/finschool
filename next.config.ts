import type { NextConfig } from "next";
import { devOriginHosts } from './src/content/dev-origins';

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: devOriginHosts,
};

export default nextConfig;
