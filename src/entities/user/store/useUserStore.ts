import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserStore } from "../types";

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      total: 0,
      page: 1,
      totalPages: 0,
      loading: false,
      error: null,
      setUsers: (newUsers, total, page, limit) =>
        set((state) => ({
          users: [
            ...state.users,
            ...newUsers.filter(
              (u) => !state.users.some((existing) => existing.id === u.id)
            ),
          ],
          total,
          page,
          totalPages: Math.ceil(total / limit),
        })),
      setLoading: (loading) => set({ loading }),
      setError: (msg) => set({ error: msg }),
      getAllUsers: () => get().users,
      getUserById: (id) => get().users.find((u) => u.id === id),
      hasUsers: () => get().users.length > 0,
    }),
    {
      name: "user-store",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) =>
            ["users", "total", "page", "totalPages"].includes(key)
          )
        ),
    }
  )
);
