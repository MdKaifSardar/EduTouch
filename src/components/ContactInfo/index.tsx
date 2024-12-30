import { ContactInformation } from "@/utility/ContactInfo";
import Image from "next/image";
import React from "react";

const ContactInfo = () => {
  return (
    <div className="mt-[10rem] flex flex-col justify-center gap-[2rem] items-center w-full h-fit">
      <div className="text-center text-4xl font-sans font-bold">Reach Us</div>
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-[4rem] ">
        <div className="w-full gap-[1rem] flex flex-col justify-center items-start">
          <div className="text-left text-2xl font-sans font-semibold">
            OFFICE ADDRESS
          </div>
          <div className="w-full flex gap-[.4rem] flex-col justify-center items-start">
            {ContactInformation.map((info, index) => (
              <div
                key={index}
                className="flex flex-row justify-start items-center w-full gap-[1rem]"
              >
                <Image
                  src={info.icon}
                  alt="icon"
                  className="w-[2rem] h-[2rem] object-cover"
                />
                <span className="text-lg font-sans font-normal">
                  {info.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg h-[50vh] md:h-[40vh] w-full md:w-[70%]">
          <iframe
            src="https://maps.google.com/maps?q=EduTouch+Coaching+Institute,+24.08396110492166, 88.24522003228729&hl=es;z=14&t=m&amp;output=embed&amp;iwloc=A"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
