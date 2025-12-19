import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // Add this line to fix the 3D ScrollControls error
};

export default nextConfig;