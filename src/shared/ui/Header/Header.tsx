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
  const { data: session, status } = useSession();

  return (
    <header className="bg-zinc-900 text-white shadow-sm w-full dark:bg-zinc-700 dark:text-yellow-100">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="relative w-[180px] h-[40px]">
              <Image
                src={logo}
                alt="DashPilot Logo"
                fill
                priority
                sizes="(max-width: 768px) 120px, 180px"
                className="object-contain"
              />
            </div>
          </Link>

          <span className="text-lg sm:text-xl font-semibold min-w-[100px] block">
            {status === "authenticated" && session?.user?.name && `Hi, ${session.user.name}`}
          </span>
        </div>

        {status === "authenticated" && session?.user && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 w-full sm:w-auto sm:ml-auto">
            <nav
              className={clsx(
                "flex flex-col items-start gap-2",
                "min-[351px]:flex-row min-[351px]:items-center min-[351px]:gap-6"
              )}
            >
              <Link
                href="/dashboard"
                className={clsx(
                  "hover:text-blue-400 px-3 sm:px-0",
                  pathname === "/dashboard" && "underline underline-offset-4"
                )}
              >
                Dashboard
              </Link>

              <span className="hidden sm:inline-block border-l border-white h-4" />

              <Link
                href="/dataset"
                className={clsx(
                  "hover:text-blue-400 px-3 sm:px-0",
                  pathname === "/dataset" && "underline underline-offset-4"
                )}
              >
                Data
              </Link>

              <span className="hidden sm:inline-block border-l border-white h-4" />

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-red-400 hover:text-red-300 px-3 sm:px-0"
              >
                Logout
              </button>
            </nav>

            <div className="sm:ml-6 mt-2 sm:mt-0">
              <ThemeSelector />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
