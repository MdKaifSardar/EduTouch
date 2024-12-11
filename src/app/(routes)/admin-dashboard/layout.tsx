import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-fit">
      {children}
    </div>
  );
};

export default Layout;
