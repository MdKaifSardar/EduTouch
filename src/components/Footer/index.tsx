import { footerText, phone, sociaLinks } from "@/utility/Footer";
import { NavLogo } from "@/utility/Navbar";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="rounded-t-[2rem] flex flex-col md:flex-row text-white bg-black justify-evenly items-center w-full h-fit p-[3rem]">
      <div className="flex flex-col justify-center items-start gap-[1rem]">
        <span className="text-xl font-sans font-semibold">QUICK LINKS</span>
        <div className="flex flex-col justify-center gap-[.2rem] items-start">
          {footerText.map((text, index) => (
            <div key={index} className="text-left">
              <a href={text.link}>{text.text}</a>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-[1rem] flex-col justify-center items-center ">
        <div className="relative rounded-lg  bg-white flex flex-col justify-center items-center">
          <Image
            src={NavLogo}
            alt="logo"
            className="w-[17rem] h-auto object-contain"
          />
          <span className="absolute bottom-0 text-black">
            Coaching Institute
          </span>
        </div>
        <span>Connect with Us</span>
        <div className="flex flex-row justify-center items-center gap-2">
          {sociaLinks.map((social, index) => (
            <a href={social.url} key={index} className="text-center">
              <Image
                src={social.icon}
                className="w-[3rem] h-[3rem] object-contain"
                alt="social link"
              />
            </a>
          ))}
        </div>
      </div>
      <div className="flex gap-[1rem] flex-col justify-center items-center">
        <div className="mapdiv w-[10rem] bg-gray-200 h-[5rem]"></div>
        <div className="flex flex-wrap justify-center items-center gap-[.1rem]">
          <Image
            src={phone}
            alt="phone"
            className="w-[1rem] h-[1rem] object-contain"
          />
          <span> +913482355966 </span>
          <span>/</span>
          <span> 9123648141</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
