"use client";

import { useEffect } from "react";
import { useUserStore } from "@/entities/user/store/useUserStore";
import { fetchUsers } from "@/entities/user/service/service";
import DashboardPanel from "../DashboardPanel/DashboardPanel";

export default function DashboardClient() {
  const { users, loading, error, setLoading, setError, setUsers } =
    useUserStore();

  useEffect(() => {
    const load = async () => {
      if (users.length > 0) return;

      try {
        setLoading(true);
        setError(null);

        const page = 1;
        const limit = 20;
        const result = await fetchUsers(page, limit);
        if (result) {
          setUsers(result.users, result.total, page, limit);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unexpected error loading dashboard data.");
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [users, setUsers, setError, setLoading]);

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
        Unable to load dashboard data. Please check the data service or try
        again later.
      </p>
    );
  }

  return <DashboardPanel />;
}
