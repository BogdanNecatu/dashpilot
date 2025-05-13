import { create } from "zustand";
import { UserStore, User } from "../types";

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  total: 0,
  page: 1,
  totalPages: 0,
  loading: false,
  error: null,

  setUsers: (newUsers: User[], total, page, limit) => {
    set({
      users: newUsers,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

    if (typeof window !== "undefined") {
      localStorage.setItem("user-store", JSON.stringify(newUsers));
    }
  },

  hasHydrated: false,

hydrateUsers: () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("user-store");
    if (stored) {
      const parsed: User[] = JSON.parse(stored);
      set({
        users: parsed,
        total: parsed.length,
        page: 1,
        totalPages: Math.ceil(parsed.length / 20),
        hasHydrated: true, 
        loading: false,    
      });
    } else {
      set({ hasHydrated: true, loading: false });
    }
  }
},

  setLoading: (loading) => set({ loading }),
  setError: (msg) => set({ error: msg }),
  getAllUsers: () => get().users,
  getUserById: (id) => get().users.find((u) => u.id === id),
  hasUsers: () => get().users.length > 0,
}));
