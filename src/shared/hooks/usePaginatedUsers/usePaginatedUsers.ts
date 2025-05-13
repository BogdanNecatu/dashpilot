"use client";

import { useMemo } from "react";
import { useUserStore } from "@/entities/user/store/useUserStore";

export const usePaginatedUsers = (page: number, limit: number = 10) => {
  const { users, loading, error, total, hasHydrated } = useUserStore();

  const totalPages = useMemo(() => {
    return Math.ceil(users.length / limit);
  }, [users.length, limit]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (page - 1) * limit;
    return users.slice(startIndex, startIndex + limit);
  }, [users, page, limit]);

  return {
    users: hasHydrated ? paginatedUsers : [],
    total: hasHydrated ? total : 0,
    loading: !hasHydrated || loading,
    error: hasHydrated ? error : null,
    totalPages: hasHydrated ? totalPages : 0,
  };
};
