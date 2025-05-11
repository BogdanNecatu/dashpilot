"use client";

import { useUserStore } from "@/entities/user/store/useUserStore";
import Link from "next/link";
import UserDetail from "../UserDetail/UserDetail";

export default function UserDetailClient({ userId }: { userId: string }) {
  const { hasUsers, getUserById } = useUserStore();

  if (!hasUsers()) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-500">
          User data not loaded
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Please load the dataset first by visiting the Dataset page.
        </p>
      </section>
    );
  }

  const user = getUserById(Number(userId));

  if (!user) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-500">User not found</h2>
        <p className="text-gray-600 dark:text-gray-300">
          The user with ID <code>{userId}</code> does not exist in the current
          dataset.
        </p>
        <p className="mt-4">
          <Link
            href="/dataset"
            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Go back to dataset
          </Link>
        </p>
      </section>
    );
  }

  return <UserDetail user={user} />;
}
