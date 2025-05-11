import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["randomuser.me"], // ✅ permite cargar imágenes desde este dominio
  },
};

module.exports = nextConfig;
