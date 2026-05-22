import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/viral-video-ai",
  trailingSlash: true,
};

export default nextConfig;
