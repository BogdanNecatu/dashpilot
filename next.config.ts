import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["dummyjson.com"], // ✅ permite cargar imágenes desde este dominio
  },
};

export default nextConfig;
