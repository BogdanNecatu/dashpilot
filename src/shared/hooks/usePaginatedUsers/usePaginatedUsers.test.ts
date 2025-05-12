import { renderHook } from "@testing-library/react";
import { usePaginatedUsers } from "./usePaginatedUsers";
import { useUserStore } from "@/entities/user/store/useUserStore";

jest.mock("@/entities/user/store/useUserStore");

type MockUser = {
  id: number;
  name: string;
};

let mockUsers: MockUser[];

describe("usePaginatedUsers", () => {
  let mockUseUserStore: jest.Mock;

  beforeEach(() => {
    mockUsers = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, name: `User ${i + 1}` }));

    mockUseUserStore = jest.fn().mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
      total: mockUsers.length,
    });

    (useUserStore as jest.Mock).mockImplementation(mockUseUserStore);
  });

  it("should return the correct paginated users", () => {
    const { result } = renderHook(() => usePaginatedUsers(2, 10));

    expect(result.current.users.length).toBe(10);
    expect(result.current.users[0].name).toBe("User 11");
    expect(result.current.users[9].name).toBe("User 20");
    expect(result.current.totalPages).toBe(5);
  });

  it("should return the correct total pages", () => {
    const { result } = renderHook(() => usePaginatedUsers(1, 15));

    expect(result.current.totalPages).toBe(4); // 50 usuarios divididos en páginas de 15 → 4 páginas totales
  });

  it("should handle loading state", () => {
    mockUseUserStore.mockReturnValue({ users: [], loading: true, error: null, total: 0 });
    const { result } = renderHook(() => usePaginatedUsers(1, 10));

    expect(result.current.loading).toBe(true);
    expect(result.current.users).toEqual([]);
  });

  it("should handle errors", () => {
    mockUseUserStore.mockReturnValue({ users: [], loading: false, error: "API Error", total: 0 });
    const { result } = renderHook(() => usePaginatedUsers(1, 10));

    expect(result.current.error).toBe("API Error");
  });
});
