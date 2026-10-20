import type { NextConfig } from "next";
import { devOriginHosts } from './src/content/dev-origins';

const nextConfig: NextConfig = {
  devIndicators: false,
  // Confirmation/recovery callback queries contain one-time credentials.
  logging: { incomingRequests: { ignore: [/\/auth\/callback(?:\?|$)/, /\/actualizeaza-parola(?:\?|$)/] } },
  allowedDevOrigins: devOriginHosts,
};

export default nextConfig;
