import { AppImage, DownloadText } from "@/utility/DownloadSec";
import Image from "next/image";
import React from "react";

const DownloadSec = () => {
  return (
    <div className="flex flex-row justify-center items-center w-full h-fit">
      <div className="gap-[1rem] p-4 flex w-full md:w-[60%] flex-col md:flex-row justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-[1rem]">
          <button className="p-4 rounded-lg bg-[#3554bb] text-white">DOWNLOAD APP</button>
          <span className="text-center">{DownloadText}</span>
        </div>
        <Image
          src={AppImage}
          alt="playstore image"
          className="w-auto h-[30rem] object-contain"
        />
      </div>
    </div>
  );
};

export default DownloadSec;
