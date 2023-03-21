import React, { ReactNode } from "react";
import Navigation from "./Navigation";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navigation />
      <div className="mt-20">{children}</div>
    </div>
  );
}

export default Layout;
