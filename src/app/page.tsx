export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center h-full text-center gap-6 px-4 py-20">
      <h1 className="text-4xl font-bold text-foreground">
        Bienvenido a <span className="text-blue-600">DashPilot</span>
      </h1>

      <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
        Aplicación de prueba técnica desarrollada con Next.js 14, Tailwind CSS y
        TypeScript. Incluye autenticación personalizada, dashboard con gráficas,
        gestión de datos y testing.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <a
          href="/login"
          className="bg-foreground text-background px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-white/80 transition"
        >
          Iniciar sesión
        </a>
        <a
          href="/dashboard"
          className="border border-gray-300 dark:border-white/20 px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition"
        >
          Ir al Dashboard
        </a>
      </div>
    </section>
  );
}
