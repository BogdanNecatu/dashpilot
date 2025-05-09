"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import ThemeSelector from "./ThemeSelector";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="bg-zinc-900 text-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">DashPilot</h1>

        <nav className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className={`hover:text-blue-400 ${
              pathname === "/dashboard" && "underline underline-offset-4"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/dataset"
            className={`hover:text-blue-400 ${
              pathname === "/dataset" && "underline underline-offset-4"
            }`}
          >
            Data
          </Link>

          <ThemeSelector />

          {session?.user && (
            <div className="flex items-center gap-4">
              <span className="text-sm">Hi, {session.user.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
