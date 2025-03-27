"use client";

import { PropsWithChildren } from "react";
// import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { theme } from "@/styles/theme";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
