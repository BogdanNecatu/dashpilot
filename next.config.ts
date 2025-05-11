import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["randomuser.me"], // ✅ permite cargar imágenes desde este dominio
  },
};

export default nextConfig;
