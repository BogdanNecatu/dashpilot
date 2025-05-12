/// <reference types="jest" />
import { act } from "@testing-library/react";
import { useUserStore } from "./useUserStore";
import { mockUsers } from "@/shared/lib/mockTestUsers";

beforeEach(() => {
  useUserStore.setState({
    users: [],
    total: 0,
    page: 1,
    totalPages: 0,
    loading: false,
    error: null,
  });
});
const mockUser = mockUsers[0];

test("setUsers updates store correctly", () => {
  act(() => {
    useUserStore.getState().setUsers([mockUser], 1, 1, 20);
  });

  const state = useUserStore.getState();
  expect(state.users).toEqual([mockUser]);
  expect(state.total).toBe(1);
  expect(state.page).toBe(1);
  expect(state.totalPages).toBe(1);
});

test("setLoading updates loading state", () => {
  act(() => {
    useUserStore.getState().setLoading(true);
  });
  expect(useUserStore.getState().loading).toBe(true);
});

test("setError sets error message", () => {
  act(() => {
    useUserStore.getState().setError("Failed");
  });
  expect(useUserStore.getState().error).toBe("Failed");
});

test("getUserById returns the correct user", () => {
  act(() => {
    useUserStore.getState().setUsers([mockUser], 1, 1, 20);
  });

  const user = useUserStore.getState().getUserById(mockUser.id);
  expect(user).toEqual(mockUser);
});

test("hasUsers returns true when users are present", () => {
  act(() => {
    useUserStore.getState().setUsers([mockUser], 1, 1, 20);
  });

  expect(useUserStore.getState().hasUsers()).toBe(true);
});

export {};
