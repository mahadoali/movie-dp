"use client";
import { SessionProvider } from "next-auth/react";
import { FavoritesProvider } from "../context/FavoritesContext";
import { ReactNode } from "react";
export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </SessionProvider>
  );
}









