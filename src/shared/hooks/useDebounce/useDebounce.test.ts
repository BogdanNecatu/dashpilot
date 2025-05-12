import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should update value after specified delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: "initial" },
    });

    expect(result.current).toBe("initial");

    // Cambiamos el valor y simulamos el tiempo
    rerender({ value: "updated" });
    expect(result.current).toBe("initial"); // Aún no ha cambiado

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("updated"); // Ahora sí ha cambiado
  });

  it("should reset timer if value changes before delay ends", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: "first" },
    });

    rerender({ value: "second" });

    act(() => {
      jest.advanceTimersByTime(200); // Avanzamos solo 200ms
    });

    expect(result.current).toBe("first"); // No ha cambiado aún

    rerender({ value: "third" });

    act(() => {
      jest.advanceTimersByTime(300); // Ahora sí esperamos 300ms completos
    });

    expect(result.current).toBe("third"); // Se actualiza correctamente
  });
});
