"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col justify-center items-center bg-white dark:bg-gray-900 text-center p-6">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        This page does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to Home Page
      </Link>
    </main>
  );
}
