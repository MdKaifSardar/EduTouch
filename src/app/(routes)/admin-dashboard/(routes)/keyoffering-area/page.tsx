"use client";

import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import KeyOfferingUploadForm from "./_component/KeyOfferingUploadForm";
import DisplayKeyOfferings from "./_component/DisplayKeyOfferings";

const Page = () => {
  const [reload, setReload] = useState(false);

  const handleCourseCreated = () => {
    setReload(!reload);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start w-full">
      <ToastContainer />
      <KeyOfferingUploadForm onImageUploaded={handleCourseCreated} />
      <DisplayKeyOfferings reload={reload} />
    </div>
  );
};

export default Page;
