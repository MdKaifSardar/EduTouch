import { DownloadText, playStoreImage } from "@/utility/DownloadSec";
import Image from "next/image";
import React from "react";

const DownloadSec = () => {
  return (
    <div className="flex flex-row justify-center items-center w-full h-fit">
      <div className="gap-[1rem] border-[2px] border-black rounded-xl p-4 flex w-full md:w-[60%] flex-row justify-center items-center">
        <span>{DownloadText}</span>
        <Image
          src={playStoreImage}
          alt="playstore image"
          className="w-[2rem] h-fit object-contain"
        />
      </div>
    </div>
  );
};

export default DownloadSec;
