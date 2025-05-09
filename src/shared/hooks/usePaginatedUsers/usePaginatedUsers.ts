import { useEffect } from "react";
import { useUserStore } from "@/entities/user/store/useUserStore";
import { fetchUsers } from "@/entities/user/service/service";

export const usePaginatedUsers = (page: number, limit: number = 10) => {
  const { users, total, loading, error, totalPages } = useUserStore();

  useEffect(() => {
    fetchUsers(page, limit);
  }, [page, limit]);

  return { users, total, loading, error, totalPages };
};
