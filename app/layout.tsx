import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Space_Grotesk } from "next/font/google";
import { neobrutalism } from "@clerk/themes";
import "./global.css";

import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
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
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <html>
        <body className={`${inter.variable} ${spaceGrotesk.variable} `}>
          <main className="flex min-h-screen items-center justify-center">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;
