import LoginFormComponent from "@/components/LoginFormComponent";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { LoginPosterImage } from "@/utility/LoginPoster";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <div className="h-screen py-[4rem] px-[2rem] md:px-[5rem] gap-[1rem] lg:gap-[5rem] bg-gradient-to-b from-blue-800 via-blue-500 to-blue-100 flex flex-col justify-center w-full">
      <ToastContainer />
      <Link
        href="/"
        className="absolute top-[1rem] md:top-[1rem] left-[1rem] md:left-[2rem] text-white text-4xl font-bold z-[10]"
      >
        &times;
      </Link>

      <div className="text-center text-3xl font-bold font-sans text-white">
        Welcome Back !
      </div>
      <div className="w-full flex flex-col md:flex-row gap-[1rem] justify-center items-center md:gap-[5rem]">
        <LoginFormComponent />
        <Image
          src={LoginPosterImage}
          width={300}
          height={200}
          className="md:block hidden md:w-[40%] w-auto h-auto object-cover"
          alt="login poster"
        />
      </div>
    </div>
  );
};

export default page;
