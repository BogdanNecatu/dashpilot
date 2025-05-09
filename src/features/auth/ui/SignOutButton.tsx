"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="mt-6 px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded transition"
    >
      Sign out
    </button>
  );
}
