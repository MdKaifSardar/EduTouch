import { footerText, phone, sociaLinks } from "@/utility/Footer";
import { NavLogo } from "@/utility/Navbar";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-[1rem] rounded-t-[2rem] flex flex-col md:flex-row text-white bg-black justify-evenly items-center w-full h-fit p-[1rem] pt-[3rem] md:pt-[3rem] md:p-[3rem]">
      <div className="mb-[1.5rem] w-full flex md:hidden flex-row justify-between items-start">
        <div className="flex flex-col justify-center items-start gap-[1rem]">
          <span className="text-lg sm:text-xl font-sans font-semibold">
            QUICK LINKS
          </span>
          <div className="sm:text-lg leading-[1.1rem] text-xs flex flex-col justify-center gap-[.2rem] items-start">
            {footerText.map((text, index) => (
              <div key={index} className="text-left">
                <a href={text.link}>{text.text}</a>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-[.5rem] sm:gap-[1rem] flex-col justify-center items-center">
          <div className="relative rounded-lg bg-white flex flex-col justify-center items-center">
            <Image
              src={NavLogo}
              alt="logo"
              className="w-[13rem] md:w-[17rem] h-auto object-contain"
            />
            <span className="absolute pl-[1.6rem] text-[.7rem] w-full bottom-[10px] font-semibold text-center text-black">
              পোড়বো লোরবো জিতবো রে
            </span>
          </div>
          <span>Connect with Us</span>
          <div className="flex flex-row justify-center items-center gap-2">
            {sociaLinks.map((social, index) => (
              <a href={social.url} key={index} className="text-center">
                <Image
                  src={social.icon}
                  className="w-[1.8rem] sm:w-[3rem] h-[3rem] object-contain"
                  alt="social link"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="md:flex hidden flex-col justify-center items-start gap-[1rem]">
        <span className="text-xl font-sans font-semibold">QUICK LINKS</span>
        <div className="flex flex-col justify-center gap-[.2rem] items-start">
          {footerText.map((text, index) => (
            <div key={index} className="text-left">
              <a href={text.link}>{text.text}</a>
            </div>
          ))}
        </div>
      </div>
      <div className="md:flex hidden gap-[1rem] flex-col justify-center items-center ">
        <div className="relative rounded-lg gap-[.3rem] bg-white flex flex-col justify-center items-center">
          <Image
            src={NavLogo}
            alt="logo"
            className="w-[17rem] h-auto object-contain"
          />
          <span className="absolute w-full text-[.9rem] pl-[3rem] bottom-[15px] font-semibold text-center text-black">
            পোড়বো লোরবো জিতবো রে
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
      <div className="flex gap-[1rem] flex-col justify-center w-full md:w-fit items-center">
        <div className="sm:text-xl text-lg flex flex-wrap justify-center items-center gap-[.1rem]">
          <Image
            src={phone}
            alt="phone"
            className="w-[1rem] h-[1rem] object-contain"
          />
          <span> +913482355966 </span>
          <span>/</span>
          <span> 9123648141</span>
        </div>
        <div className="w-full bg-gray-200 h-[20rem] md:h-[10rem]" />
      </div>
    </div>
  );
};

export default Footer;
