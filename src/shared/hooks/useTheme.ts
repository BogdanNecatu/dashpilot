"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

const THEME_KEY = "dashpilot-theme";

export function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    const saved = (localStorage.getItem(THEME_KEY) as Theme) || "system";
    applyTheme(saved);
    setThemeState(saved);
  }, []);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(THEME_KEY, newTheme);
    applyTheme(newTheme);
    setThemeState(newTheme);
  };

  const applyTheme = (theme: Theme) => {
    const root = window.document.documentElement;
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (theme === "dark" || (theme === "system" && systemDark)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  return [theme, setTheme];
}
