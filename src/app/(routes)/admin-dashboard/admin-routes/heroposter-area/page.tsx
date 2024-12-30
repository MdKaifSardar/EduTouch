"use client";

import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import DisplayPoster from "./_component/DisplayPoster";
import HeroPosterImageUpload from "./_component/PosterImageUpload";

const Page = () => {
  const [reload, setReload] = useState(false);

  const handleCourseCreated = () => {
    setReload(!reload);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start w-full">
      <ToastContainer />
      <HeroPosterImageUpload onImageUploaded={handleCourseCreated} />
      <DisplayPoster reload={reload} />
    </div>
  );
};

export default Page;
