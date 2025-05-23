"use client";

import { useEffect } from "react";
import { useUserStore } from "@/entities/user/store/useUserStore";
import { fetchAllUsers } from "@/entities/user/service/service";
import DashboardPanel from "../DashboardPanel/DashboardPanel";

export default function DashboardClient() {
  const { loading, error, hasUsers, setUsers, setLoading, setError } =
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
            setError("Failed to load users");
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
        Loading dashboard data...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 dark:text-red-400 font-semibold">
        Unable to load dashboard data. Please try again later.
      </p>
    );
  }

  return <DashboardPanel />;
}
