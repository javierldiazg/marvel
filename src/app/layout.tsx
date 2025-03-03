"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Header } from "@/components/Header";
import { queryClient } from "../lib/reactQueryClient";
import "@/styles/globals.scss";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Header />
            {children}
            <footer />
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
