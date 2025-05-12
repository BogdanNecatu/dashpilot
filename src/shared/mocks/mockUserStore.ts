import { User } from "@/entities/user/types";

export const mockSetLoading = jest.fn();
export const mockSetUsers = jest.fn();
export const mockSetError = jest.fn();
export const mockHydrateUsers = jest.fn();
export const mockGetAllUsers = jest.fn((): User[] => []);
export const mockGetUserById = jest.fn();
export const mockHasUsers = jest.fn(() => false);

export const mockUserStore = {
  users: [],
  total: 0,
  page: 1,
  totalPages: 0,
  loading: false,
  error: null,

  setLoading: mockSetLoading,
  setUsers: mockSetUsers,
  setError: mockSetError,
  hydrateUsers: mockHydrateUsers,
  getAllUsers: mockGetAllUsers,
  getUserById: mockGetUserById,
  hasUsers: mockHasUsers,
};
