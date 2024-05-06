import Navbar from "@/components/shared/navbar/Navbar";
import LeftSidebar from "@/components/shared/sidebar/LeftSidebar";
import RightSidebar from "@/components/shared/sidebar/RightSidebar";

import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* main block */}
      <main className="background-light850_dark100 relative ">
        {/* navbar */}
        <Navbar />

        <div className="flex">
          {/* left sidebar */}
          <LeftSidebar />
          <section
            className="flex min-h-screen flex-1 flex-col 
            px-6 pb-6 pt-36 
            max-md:pb-14 sm:px-14"
          >
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </section>
          {/* right sidebar */}
          <RightSidebar />
        </div>
      </main>
    </>
  );
};

export default Layout;