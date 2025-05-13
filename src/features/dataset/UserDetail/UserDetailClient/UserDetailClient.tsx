"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useUserStore } from "@/entities/user/store/useUserStore";
import { useEnsureUsersLoaded } from "@/shared/hooks/useEnsureUsersLoaded/useEnsureUsersLoaded";
import UserDetail from "../UserDetail/UserDetail";

export default function UserDetailClient() {
  const { id } = useParams();
  const isNumberId = Number(id);
  const { loading, hasUsers, getUserById } = useUserStore();

  useEnsureUsersLoaded();

  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    if (!loading && hasUsers()) {
      const timer = setTimeout(() => {
        setReadyToRender(true);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [loading, hasUsers]);

  if (loading || !readyToRender) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-10 text-center">
        <p className="text-gray-500 dark:text-gray-300 text-lg animate-pulse">
          Loading user data...
        </p>
      </section>
    );
  }

  if (!hasUsers()) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-500">
          User data not loaded
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Please visit the{" "}
          <Link href="/dataset" className="text-blue-600 underline">
            Dataset page
          </Link>{" "}
          to load users.
        </p>
      </section>
    );
  }

  function getSafeUserId(
    isNumberId: unknown,
    fallbackId: unknown
  ): string | number {
    if (typeof isNumberId === "number" && !Number.isNaN(isNumberId)) {
      return isNumberId;
    }
    if (typeof fallbackId === "number" || typeof fallbackId === "string") {
      return fallbackId;
    }
    return "";
  }

  const userID = getSafeUserId(isNumberId, id);

  const user =
    typeof isNumberId === "number" && !Number.isNaN(isNumberId)
      ? getUserById(userID as number)
      : null;

  if (!user) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-500">User not found</h2>
        <p className="text-gray-600 dark:text-gray-300">
          No user with ID <code>{userID}</code> was found in the loaded dataset.
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
