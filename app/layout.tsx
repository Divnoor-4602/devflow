import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import "./global.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html>
        <body>
          <main className="flex min-h-screen items-center justify-center">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;
