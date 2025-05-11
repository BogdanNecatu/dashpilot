"use client";

import { SessionProvider } from "next-auth/react";
import ThemeProvider from "@/shared/ui/ThemeProvider/ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
}
