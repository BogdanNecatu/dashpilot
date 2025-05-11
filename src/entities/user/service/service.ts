import axiosInstance from "@/shared/api/axiosInstance";
import { useUserStore } from "../store/useUserStore";
import { UsersApiResponse } from "../types";

export const fetchAllUsers = async (): Promise<{
  users: UsersApiResponse["users"];
  total: number;
}> => {
  const store = useUserStore.getState();

  store.setLoading(true);
  store.setError(null);

  try {
    const response = await axiosInstance.get<UsersApiResponse>(
      "/users?limit=1000&skip=0"
    );
    const { users, total } = response.data;

    store.setUsers(users, total, 1, total);
    return { users, total };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    store.setError(errorMessage);
    throw new Error(errorMessage);
  } finally {
    store.setLoading(false);
  }
};
