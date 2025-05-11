import axiosInstance from "@/shared/api/axiosInstance";
import { useUserStore } from "../store/useUserStore";
import { UsersApiResponse } from "../types";

export const fetchUsers = async (page: number, limit: number = 10) => {
  const skip = (page - 1) * limit;
  const store = useUserStore.getState();

  store.setLoading(true);
  store.setError(null);

  try {
    const res = await axiosInstance.get<UsersApiResponse>(
      `/users?limit=${limit}&skip=${skip}`
    );
    const { users, total } = res.data;
    console.log(users);
    store.setUsers(users, total, page, limit);
  } catch (err: unknown) {
    if (err instanceof Error) {
      store.setError(err.message);
    } else {
      store.setError("Unknown error");
    }
  }
};
