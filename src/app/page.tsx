"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/dashpilot.png";

export default function HomePage() {
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
       Welcome to <span className="text-blue-600">DashPilot</span>
      </h1>

      <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
        Application developed with Next.js 14, Tailwind CSS and
        TypeScript. Includes custom authentication, dashboard with graphs,
        data management and testing.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Link
          href="/dashboard"
          className="px-6 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </section>
  );
}
