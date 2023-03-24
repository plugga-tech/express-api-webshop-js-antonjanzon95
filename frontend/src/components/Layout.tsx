import React, { useContext } from "react";
import Navigation from "./Navigation";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Navigation />
      <div className="max-w-[800px] mx-auto pt-20">{children}</div>
    </div>
  );
};

export default Layout;
