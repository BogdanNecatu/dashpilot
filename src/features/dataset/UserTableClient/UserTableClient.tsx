"use client";

import { useEffect } from "react";
import { useUserStore } from "@/entities/user/store/useUserStore";
import { fetchAllUsers } from "@/entities/user/service/service";
import UserTable from "../UserTable/UserTable";

export default function UserTableClient() {
  const { hasUsers, setUsers, setLoading, setError, loading, error } =
    useUserStore();

  useEffect(() => {
    const loadUsers = async () => {
      if (!hasUsers()) {
        try {
          setLoading(true);
          const { users, total } = await fetchAllUsers();
          setUsers(users, total, 1, 20);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Failed to load dataset.");
          }
        } finally {
          setLoading(false);
        }
      }
    };

    loadUsers();
  }, [hasUsers, setUsers, setLoading, setError]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-300">
        Loading dataset...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 dark:text-red-400 font-semibold">
        {error}
      </p>
    );
  }

  return <UserTable />;
}
