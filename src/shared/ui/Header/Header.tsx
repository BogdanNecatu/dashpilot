"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import clsx from "clsx";
import Image from "next/image";
import logo from "@/assets/images/dashpilot.png";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="bg-zinc-900 text-white shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col items-start gap-4 min-[351px]:items-center min-[351px]:flex-col sm:flex-row sm:justify-between">
        {/* Logo + Nombre */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src={logo}
              alt="DashPilot Logo"
              width={150}
              height={150}
              priority
            />
          </Link>
          {session?.user && (
            <span className="text-lg sm:text-xl font-semibold">
              Hi, {session.user.name}
            </span>
          )}
        </div>

        {/* Menú de navegación */}
        {session?.user && (
          <nav
            className={clsx(
              "flex flex-col items-start gap-2",
              "min-[351px]:flex-row min-[351px]:items-center min-[351px]:gap-6"
            )}
          >
            <Link
              href="/dashboard"
              className={clsx(
                "hover:text-blue-400",
                pathname === "/dashboard" && "underline underline-offset-4"
              )}
            >
              Dashboard
            </Link>

            <Link
              href="/dataset"
              className={clsx(
                "hover:text-blue-400",
                pathname === "/dataset" && "underline underline-offset-4"
              )}
            >
              Data
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </nav>
        )}

        {/* Selector de tema */}
        <div className="ml-auto sm:ml-0">
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}
