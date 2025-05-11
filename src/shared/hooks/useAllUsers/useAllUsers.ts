"use client";

import { useEffect } from "react";
import { fetchAllUsers } from "@/entities/user/service/service";
import { useUserStore } from "@/entities/user/store/useUserStore";

export const useAllUsers = () => {
  const {
    users,
    loading,
    error,
    total,
    hasUsers,
    setLoading,
    setError,
    setUsers,
  } = useUserStore();

  useEffect(() => {
    const loadUsers = async () => {
      if (hasUsers()) return;

      try {
        setLoading(true);
        setError(null);
        const { users, total } = await fetchAllUsers();
        setUsers(users, total, 1, 20);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unexpected error loading users.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [hasUsers, setLoading, setError, setUsers]);

  return { users, loading, error, total };
};
