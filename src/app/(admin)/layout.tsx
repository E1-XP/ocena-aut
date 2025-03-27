"use client";
import { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { Archivo } from "next/font/google";
import "@/styles/globals.css";

import Navbar from "@/components/admin/Navbar";
import Providers from "@/providers";

const font = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function Layout({ children }: PropsWithChildren): JSX.Element {
  return (
    <html lang="pl">
      <body className={font.className}>
        <Providers>
          <Navbar />
          <MainWrapper>{children}</MainWrapper>
        </Providers>
      </body>
    </html>
  );
}

const MainWrapper = styled.main`
  position: relative;
  height: calc(100vh - 216px);
  padding: 0px max(5%, 15px) 15px max(5%, 15px);
`;
