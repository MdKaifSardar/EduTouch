import { footerText, phone, sociaLinks } from "@/utility/Footer";
import { FooterLogo } from "@/utility/Navbar";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-[1rem] rounded-t-[2rem] flex flex-col md:flex-row text-white bg-black justify-evenly gap-[2rem] items-start w-full h-fit p-[1rem] pt-[3rem] md:pt-[3rem] md:p-[3rem]">
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
          <div className="rounded-lg bg-white flex flex-col justify-center items-center">
            <Image
              src={FooterLogo}
              alt="logo"
              className="w-[12rem] h-auto object-contain"
            />
          </div>
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
        <div className="rounded-lg bg-white flex flex-col justify-center items-center">
          <Image
            src={FooterLogo}
            alt="logo"
            className="w-[20rem] h-auto object-contain"
          />
        </div>
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
            width={300}
            height={300}
            className="w-[1.5rem] h-auto object-contain"
          />
          <span> 7586049871</span>
          <span>/</span>
          <span>9123648141</span>
        </div>
        <div className="flex flex-col justify-center items-center overflow-hidden shadow-lg h-[20rem] w-full">
          <iframe
            src="https://maps.google.com/maps?q=EduTouch+Coaching+Institute,+24.08396110492166, 88.24522003228729&hl=es;z=14&t=m&amp;output=embed&amp;iwloc=A"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg lg:w-[95%] w-[80%] h-[80%] lg:h-[95%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
