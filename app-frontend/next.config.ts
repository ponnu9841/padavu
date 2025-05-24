import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
   images: {
      remotePatterns: [
         {
            protocol: "http",
            hostname: "127.0.0.1",
            pathname: "/uploads/**",
            port: "8000",
         },
         {
            protocol: "http",
            hostname: "localhost",
            pathname: "/uploads/**",
            port: "8000",
         },
      ],
   },
};

export default nextConfig;
