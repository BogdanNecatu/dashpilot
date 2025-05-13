import { renderHook, waitFor } from "@testing-library/react";
import { useAllUsers } from "./useAllUsers";
import { useUserStore } from "@/entities/user/store/useUserStore";
import { mockUsers } from "@/shared/lib/mocks/mockTestUsers";
import * as userService from "@/entities/user/service/service";

jest.mock("@/entities/user/service/service", () => ({
  fetchAllUsers: jest.fn(),
}));

describe("useAllUsers hook", () => {
  const fetchAllUsersMock = userService.fetchAllUsers as jest.Mock;

  beforeEach(() => {
    useUserStore.setState({
      users: [],
      total: 0,
      page: 1,
      totalPages: 0,
      loading: false,
      error: null,
      setUsers: useUserStore.getState().setUsers,
      hydrateUsers: useUserStore.getState().hydrateUsers,
      setLoading: useUserStore.getState().setLoading,
      setError: useUserStore.getState().setError,
      getAllUsers: useUserStore.getState().getAllUsers,
      getUserById: useUserStore.getState().getUserById,
      hasUsers: () => false,
    });
    jest.clearAllMocks();
  });

  it("loads and sets users on first mount", async () => {
    fetchAllUsersMock.mockResolvedValueOnce({
      users: mockUsers,
      total: mockUsers.length,
    });

    const { result } = renderHook(() => useAllUsers());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(fetchAllUsersMock).toHaveBeenCalled();
    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.error).toBeNull();
    expect(result.current.total).toBe(mockUsers.length);
  });

  it("does not call fetchAllUsers if users already exist", async () => {
    useUserStore.setState({
      users: mockUsers,
      total: mockUsers.length,
      page: 1,
      totalPages: 1,
      loading: false,
      error: null,
      setUsers: useUserStore.getState().setUsers,
      hydrateUsers: useUserStore.getState().hydrateUsers,
      setLoading: useUserStore.getState().setLoading,
      setError: useUserStore.getState().setError,
      getAllUsers: useUserStore.getState().getAllUsers,
      getUserById: useUserStore.getState().getUserById,
      hasUsers: () => true,
    });

    renderHook(() => useAllUsers());

    expect(fetchAllUsersMock).not.toHaveBeenCalled();
  });

  it("sets error if fetch fails", async () => {
    fetchAllUsersMock.mockRejectedValueOnce(new Error("Failed to fetch"));

    const { result } = renderHook(() => useAllUsers());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Failed to fetch");
    expect(result.current.users).toEqual([]);
  });
});
