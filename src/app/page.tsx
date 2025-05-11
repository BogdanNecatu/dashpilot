"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import logo from "@/assets/images/dashpilot.png";

export default function HomePage() {
  const { data: session } = useSession();
  return (
    <section className="flex flex-col items-center justify-center px-4 py-16 text-center gap-8">
      <div className="relative w-[280px] h-[70px]">
        <Image
          src={logo}
          alt="DashPilot Logo"
          fill
          priority
          sizes="(max-width: 768px) 120px, 180px"
          className="object-contain"
        />
      </div>

      <h1 className="text-4xl font-bold text-foreground">
        Bienvenido a <span className="text-blue-600">DashPilot</span>
      </h1>

      <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
        Aplicación de prueba técnica desarrollada con Next.js 14, Tailwind CSS y
        TypeScript. Incluye autenticación personalizada, dashboard con gráficas,
        gestión de datos y testing.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Link
          href="/dashboard"
          className="px-6 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Ir al Dashboard
        </Link>
      </div>
    </section>
  );
}
