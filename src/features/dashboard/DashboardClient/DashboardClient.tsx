"use client";

import DashboardPanel from "../DashboardPanel/DashboardPanel";
import { useUserStore } from "@/entities/user/store/useUserStore";

export default function DashboardClient() {
  const { loading, error } = useUserStore();

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
