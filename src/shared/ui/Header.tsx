"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import ThemeSelector from "./ThemeSelector";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="bg-zinc-900 text-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
        {!session?.user ? (
          <h1 className="text-xl font-bold">DashPilot</h1>
        ) : (
          <nav className="flex flex-wrap items-center gap-8 text-m">
            <span className="font-medium text-xl">Hi, {session.user.name}</span>
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

        {/* Right side always visible */}
        <ThemeSelector />
      </div>
    </header>
  );
}
