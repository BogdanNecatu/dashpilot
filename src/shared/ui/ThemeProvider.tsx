"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/shared/hooks/useTheme";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme] = useTheme();
  const [mounted, setMounted] = useState(false);

  // Esperamos al montaje del cliente para evitar mismatch en SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
}
