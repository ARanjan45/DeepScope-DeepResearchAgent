import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler:{
    removeConsole: process.env.NODE_ENV === "production" ? true : false,
  },
  typescript:{
    ignoreBuildErrors: true
  }
};

export default nextConfig;
