"use client";

import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import DisplayGallery from "./_component/DisplayGallery";
import GalleryImageUpload from "./_component/GalleryImageUpload";

const Page = () => {
  const [reload, setReload] = useState(false);

  const handleCourseCreated = () => {
    setReload(!reload);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start w-full">
      <ToastContainer />
      <GalleryImageUpload onImageUploaded={handleCourseCreated} />
      <DisplayGallery reload={reload} />
    </div>
  );
};

export default Page;
