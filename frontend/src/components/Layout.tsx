import React, { ReactNode } from "react";
import Navigation from "./Navigation";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <Navigation />
      <div className="bg-gray-200 h-screen pt-10">{children}</div>
    </div>
  );
}

export default Layout;
