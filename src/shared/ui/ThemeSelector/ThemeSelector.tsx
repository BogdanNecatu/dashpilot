"use client";

import { useTheme } from "@/shared/hooks/useTheme/useTheme";

export default function ThemeSelector() {
  const [theme, setTheme] = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as typeof theme)}
      className="bg-zinc-800 text-white text-sm px-2 py-1 rounded"
      data-testid="theme-selector"
    >
      <option value="system" data-testid="theme-option-system">
        System
      </option>
      <option value="light" data-testid="theme-option-light">
        Light
      </option>
      <option value="dark" data-testid="theme-option-dark">
        Dark
      </option>
    </select>
  );
}
