import { renderHook, act } from "@testing-library/react";
import { useTheme } from "./useTheme";

const THEME_KEY = "dashpilot-theme";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)", // Simula el modo oscuro
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });
});

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("light", "dark");
  });

  it("should initialize with the stored theme", () => {
    localStorage.setItem(THEME_KEY, "dark");

    const { result } = renderHook(() => useTheme());

    expect(result.current[0]).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("should default to 'system' if no theme is stored", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current[0]).toBe("system");
  });

  it("should update the theme and persist in localStorage", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current[1]("light");
    });

    expect(result.current[0]).toBe("light");
    expect(localStorage.getItem(THEME_KEY)).toBe("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("should correctly apply system theme based on preference", () => {
    // Simulamos el modo oscuro del sistema
    (window.matchMedia as jest.Mock).mockReturnValue({ matches: true });

    const { result } = renderHook(() => useTheme());

    expect(result.current[0]).toBe("system");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
