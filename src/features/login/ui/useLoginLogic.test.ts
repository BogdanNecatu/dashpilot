import { renderHook, act } from "@testing-library/react";
import { useLoginLogic } from "./useLoginLogic";
import { signIn } from "next-auth/react";
import { fetchAllUsers } from "@/entities/user/service/service";
import type { FormEvent } from "react";

// ✅ Mocks estrictamente con Jest
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: mockPush })),
}));

jest.mock("@/entities/user/service/service", () => ({
  fetchAllUsers: jest.fn(),
}));

const mockSetUsers = jest.fn();
const mockSetLoading = jest.fn();
const mockSetError = jest.fn();

jest.mock("@/entities/user/store/useUserStore", () => ({
  useUserStore: jest.fn(() => ({
    setUsers: mockSetUsers,
    setLoading: mockSetLoading,
    setError: mockSetError,
  })),
}));

global.fetch = jest.fn();

const createFormEvent = (): FormEvent<HTMLFormElement> =>
  ({
    preventDefault: jest.fn(),
  } as unknown as FormEvent<HTMLFormElement>);

describe("useLoginLogic", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("inicializa con valores por defecto", () => {
    const { result } = renderHook(() => useLoginLogic());

    expect(result.current.email).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.error).toBe("");
    expect(result.current.loading).toBe(false);
  });

  it("actualiza email y password", () => {
    const { result } = renderHook(() => useLoginLogic());

    act(() => {
      result.current.setEmail("test@example.com");
      result.current.setPassword("123456");
    });

    expect(result.current.email).toBe("test@example.com");
    expect(result.current.password).toBe("123456");
  });

  it("muestra error si las credenciales son inválidas", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
    (signIn as jest.Mock).mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => useLoginLogic());

    act(() => {
      result.current.setEmail("fail@test.com");
      result.current.setPassword("wrong");
    });

    await act(async () => {
      await result.current.handleSubmit(createFormEvent());
    });

    expect(signIn).toHaveBeenCalled();
    expect(result.current.error).toBe("Invalid credentials. Please try again.");
  });

  it("inicia sesión correctamente y redirige al dashboard", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
    (signIn as jest.Mock).mockResolvedValueOnce({ ok: true });
    (fetchAllUsers as jest.Mock).mockResolvedValueOnce({
      users: [{ id: 1, name: "User" }],
      total: 1,
    });

    const { result } = renderHook(() => useLoginLogic());

    act(() => {
      result.current.setEmail("success@test.com");
      result.current.setPassword("correctpass");
    });

    await act(async () => {
      await result.current.handleSubmit(createFormEvent());
    });

    expect(signIn).toHaveBeenCalledWith("credentials", {
      redirect: false,
      email: "success@test.com",
      password: "correctpass",
    });

    expect(fetchAllUsers).toHaveBeenCalled();
    expect(mockSetUsers).toHaveBeenCalledWith([{ id: 1, name: "User" }], 1, 1, 20);
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });
});
