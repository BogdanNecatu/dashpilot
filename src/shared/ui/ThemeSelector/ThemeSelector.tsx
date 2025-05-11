"use client";

import { useTheme } from "@/shared/hooks/useTheme/useTheme";

export default function ThemeSelector() {
  const [theme, setTheme] = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as typeof theme)}
      className="bg-zinc-800 text-white text-sm px-2 py-1 rounded"
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
