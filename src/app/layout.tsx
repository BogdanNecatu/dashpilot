// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Font configuration with CSS variable exposure
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Global app metadata
export const metadata: Metadata = {
  title: "DashPilot",
  description: "Data dashboard app built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {/* Aquí irá el provider de temas o sesión */}
        {/* <ThemeProvider> (más adelante) */}

        <header>{/* <MainNav /> en el futuro */}</header>

        <main className="min-h-screen">{children}</main>

        <footer className="text-center text-xs py-4 opacity-60">
          DashPilot © {new Date().getFullYear()}
        </footer>

        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
