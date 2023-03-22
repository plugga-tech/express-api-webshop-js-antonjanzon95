import React, { ReactNode } from "react";
import Navigation from "./Navigation";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-200 h-screen">
      <Navigation />
      <div className="max-w-[800px] mx-auto pt-20">{children}</div>
    </div>
  );
}

export default Layout;
