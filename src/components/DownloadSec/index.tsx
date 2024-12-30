import { AppImage, DownloadText } from "@/utility/DownloadSec";
import Image from "next/image";
import React from "react";
import AnimateComponent from "../AnimateComponent";
import AnimateHorizontal from "../AnimateHorizontal";
import Link from "next/link";

const DownloadSec = () => {
  return (
    <div className="flex flex-row justify-center items-center w-full h-fit">
      <div className="gap-[1rem] sm:gap-[2rem] p-4 flex w-full md:w-[60%] flex-col md:flex-row justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-[1rem]">
          <AnimateComponent delay={0} duration={0.5}>
            <div className="flex flex-col w-full justify-center items-center">
              <Link
                href="https://play.google.com/store/apps/details?id=co.thanos.arsgp&hl=en_IN"
                target="_blank"
                rel="noopener noreferrer" // Important for security reasons
                className="p-4 rounded-lg hover:bg-[#597af0] bg-[#3554bb] text-white"
              >
                DOWNLOAD EDUTOUCH APP
              </Link>
            </div>
          </AnimateComponent>
          <AnimateComponent delay={0.3} duration={0.5}>
            <span className="font-semibold text-[1rem] text-center">
              {DownloadText}
            </span>
          </AnimateComponent>
        </div>
        <AnimateHorizontal delay={0.3} duration={0.8} direction="left">
          <Image
            src={AppImage}
            alt="playstore image"
            className="w-auto h-[30rem] object-contain"
          />
        </AnimateHorizontal>
      </div>
    </div>
  );
};

export default DownloadSec;
