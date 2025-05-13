import { renderHook, act } from "@testing-library/react";
import { useUserTable } from "./useUserTable";
import { useUserStore } from "@/entities/user/store/useUserStore";
import { mockUsers } from "@/shared/lib/mocks/mockTestUsers";

describe("useUserTable (con store real)", () => {
  beforeEach(() => {
    useUserStore.setState({
      users: mockUsers,
      loading: false,
      error: null,
    });
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
      result.current.setSearch("john");
    });

    expect(result.current.search).toBe("john");
  });

  it("should filter users by firstName or lastName", () => {
    const { result } = renderHook(() => useUserTable());

    act(() => {
      result.current.setSearch(mockUsers[0].firstName.slice(0, 2)); 
    });

    const filtered = result.current.users;
    expect(filtered.some((u) => u.id === mockUsers[0].id)).toBe(true);
  });

  it("should toggle sorting direction on same field", () => {
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

  it("should change sort field and reset to ascending", () => {
    const { result } = renderHook(() => useUserTable());

    act(() => {
      result.current.toggleSort("age");
    });

    expect(result.current.sortField).toBe("age");
    expect(result.current.sortDirection).toBe("asc");
  });
});
