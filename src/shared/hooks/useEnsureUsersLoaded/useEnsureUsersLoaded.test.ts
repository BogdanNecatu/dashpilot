import { renderHook } from "@testing-library/react";
import { useEnsureUsersLoaded } from "./useEnsureUsersLoaded";
import { useUserStore } from "@/entities/user/store/useUserStore";

jest.mock("@/entities/user/store/useUserStore");

describe("useEnsureUsersLoaded", () => {
  let mockHasUsers: jest.Mock;
  let mockHydrateUsers: jest.Mock;

  beforeEach(() => {
    mockHasUsers = jest.fn();
    mockHydrateUsers = jest.fn();
    (useUserStore as jest.Mock).mockReturnValue({
      hasUsers: mockHasUsers,
      hydrateUsers: mockHydrateUsers,
    });
  });

  it("should call hydrateUsers if there are no users", () => {
    mockHasUsers.mockReturnValue(false);

    renderHook(() => useEnsureUsersLoaded());

    expect(mockHasUsers).toHaveBeenCalled();
    expect(mockHydrateUsers).toHaveBeenCalled();
  });

  it("should not call hydrateUsers if users already exist", () => {
    mockHasUsers.mockReturnValue(true);

    renderHook(() => useEnsureUsersLoaded());

    expect(mockHasUsers).toHaveBeenCalled();
    expect(mockHydrateUsers).not.toHaveBeenCalled();
  });
});
