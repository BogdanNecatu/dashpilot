/// <reference types="jest" />
import { fetchAllUsers } from "./service"; // ajusta según ruta real
import axiosInstance from "@/shared/api/axiosInstance";
import { UsersApiResponse } from "../types";


jest.mock("@/shared/api/axiosInstance");

const mockSetLoading = jest.fn();
const mockSetUsers = jest.fn();
const mockSetError = jest.fn();

const store = {
  setLoading: mockSetLoading,
  setUsers: mockSetUsers,
  setError: mockSetError,
};

beforeEach(() => {
  jest.clearAllMocks();
});

test("fetchAllUsers success: sets loading, users, and returns data", async () => {
  const mockSimpleUsers = [
    { id: 1, firstName: "John", lastName: "Doe" },
  ] as unknown as UsersApiResponse["users"];

  const mockData: UsersApiResponse = {
    users: mockSimpleUsers,
    total: 1,
    skip: 0,
    limit: 1000,
  };

  (axiosInstance.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

  const result = await fetchAllUsers(store);

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(mockSetUsers).toHaveBeenCalledWith(mockSimpleUsers, 1, 1, 1);
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(result).toEqual({ users: mockSimpleUsers, total: 1 });
});

test("fetchAllUsers handles Error correctly", async () => {
  const error = new Error("Request failed");
  (axiosInstance.get as jest.Mock).mockRejectedValueOnce(error);

  await expect(fetchAllUsers(store)).rejects.toThrow("Request failed");

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(mockSetError).toHaveBeenCalledWith("Request failed");
  expect(mockSetLoading).toHaveBeenCalledWith(false);
});

test("fetchAllUsers handles unknown error", async () => {
  (axiosInstance.get as jest.Mock).mockRejectedValueOnce("unknown failure");

  await expect(fetchAllUsers(store)).rejects.toThrow("Unknown error");

  expect(mockSetError).toHaveBeenCalledWith("Unknown error");
  expect(mockSetLoading).toHaveBeenCalledWith(false);
});

export {};
