import React from "react";
import AdminNavbar from "../_component/AdminNavbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-fit">
      <AdminNavbar />
      {children}
    </div>
  );
};

export default Layout;