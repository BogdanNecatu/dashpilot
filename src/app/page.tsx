// src/app/page.tsx

import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center gap-8 px-4">
      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={38}
        className="dark:invert"
        priority
      />

      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Bienvenido a <span className="text-blue-600">DashPilot</span>
      </h1>

      <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
        Este proyecto demuestra autenticación, componentes personalizados,
        dashboard con gráficos y gestión de datos usando Next.js 14, Tailwind
        CSS y TypeScript.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <a
          href="/dashboard"
          className="bg-foreground text-background px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-white/80 transition"
        >
          Ir al Dashboard
        </a>
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-gray-300 dark:border-gray-600 px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition"
        >
          Leer documentación
        </a>
      </div>
    </section>
  );
}
