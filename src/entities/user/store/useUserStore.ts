import { create } from "zustand";
import { UserStore } from "../types";

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  total: 0,
  page: 1,
  totalPages: 0,
  loading: false,
  error: null,
  setUsers: (users, total, page, limit) =>
    set({
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }),
  setLoading: (loading) => set({ loading }),
  setError: (msg) => set({ error: msg }),
}));
