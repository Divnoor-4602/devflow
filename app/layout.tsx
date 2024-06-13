import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
// @ts-ignore
import { Inter, Space_Grotesk } from "next/font/google";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import "./global.css";
import "../styles/prism.css";

import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "DevFlow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledege, and collaborate with developers from around the world.",
  icons: {
    icon: "../public/assets/images/site-logo.svg",
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <ThemeProvider>
        <body className={`${inter.variable} ${spaceGrotesk.variable} `}>
          <ClerkProvider
            appearance={{
              baseTheme: dark,
            }}
          >
            {children}
          </ClerkProvider>
          <Toaster richColors theme="dark" />
        </body>
      </ThemeProvider>
    </html>
  );
};

export default Layout;
