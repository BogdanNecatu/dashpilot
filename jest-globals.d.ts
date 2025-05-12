import "@testing-library/jest-dom";

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenCalledWith(...args: any[]): R;
      toEqual(expected: any): R;
      toBe(expected: any): R;
      toBeTruthy(): R;
      toBeFalsy(): R;
      toHaveLength(length: number): R;
      toContain(item: unknown): R;
    }
  }
}
