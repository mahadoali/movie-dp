import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;