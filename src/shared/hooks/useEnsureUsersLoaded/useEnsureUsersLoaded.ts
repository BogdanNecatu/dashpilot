"use client";

import { useEffect } from "react";
import { useUserStore } from "@/entities/user/store/useUserStore";

export const useEnsureUsersLoaded = () => {
  const { hasUsers, hydrateUsers } = useUserStore();

  useEffect(() => {
    if (!hasUsers()) {
      hydrateUsers();
    }
  }, [hasUsers, hydrateUsers]);
};
