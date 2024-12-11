"use client";

import React, { useState } from "react";
import NavImageLeft from "./NavImageLeft";
import NavLinksComponent from "./NavLinks";
import MobileNavMenu from "./MobileNavMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="bg-red-300 fixed z-[100] w-full">
      <NavImageLeft />
      <NavLinksComponent toggleMenu={toggleMenu}/>
      {isMenuOpen && <MobileNavMenu toggleMenu={toggleMenu} />}
    </div>
  );
};

export default Navbar;
