import { renderHook, act } from "@testing-library/react";
import { useUserTable } from "./useUserTable";
import { usePaginatedUsers } from "@/shared/hooks/usePaginatedUsers/usePaginatedUsers";
import { mockUsers } from "@/shared/lib/mockTestUsers";

jest.mock("@/shared/hooks/usePaginatedUsers/usePaginatedUsers");

describe("useUserTable", () => {
  let mockUsePaginatedUsers: jest.Mock;

  beforeEach(() => {
  
    mockUsePaginatedUsers = jest.fn().mockReturnValue({
      users: mockUsers,
      totalPages: 3,
      loading: false,
      error: null,
    });

    (usePaginatedUsers as jest.Mock).mockImplementation(mockUsePaginatedUsers);
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useUserTable());

    expect(result.current.page).toBe(1);
    expect(result.current.limit).toBe(20);
    expect(result.current.search).toBe("");
    expect(result.current.sortField).toBe("name");
    expect(result.current.sortDirection).toBe("asc");
  });

  it("should update page correctly", () => {
    const { result } = renderHook(() => useUserTable());

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);
  });

  it("should update limit and reset page to 1", () => {
    const { result } = renderHook(() => useUserTable());

    act(() => {
      result.current.setLimit(50);
    });

    expect(result.current.limit).toBe(50);
    expect(result.current.page).toBe(1);
  });

  it("should update search value", () => {
    const { result } = renderHook(() => useUserTable());

    act(() => {
      result.current.setSearch("John");
    });

    expect(result.current.search).toBe("John");
  });

  it("should toggle sorting direction on repeated sort field clicks", () => {
    const { result } = renderHook(() => useUserTable());

    act(() => {
      result.current.toggleSort("birthDate");
    });

    expect(result.current.sortField).toBe("birthDate");
    expect(result.current.sortDirection).toBe("asc");

    act(() => {
      result.current.toggleSort("birthDate");
    });

    expect(result.current.sortDirection).toBe("desc");
  });

  it("should change sort field and reset direction to ascending", () => {
    const { result } = renderHook(() => useUserTable());

    act(() => {
      result.current.toggleSort("age");
    });

    expect(result.current.sortField).toBe("age");
    expect(result.current.sortDirection).toBe("asc");
  });
});
