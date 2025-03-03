"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/reactQueryClient";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Header } from "@/components/Header";
import "@/styles/globals.scss";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <FavoritesProvider>
            <Header />
            {children}
            <footer />
          </FavoritesProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
