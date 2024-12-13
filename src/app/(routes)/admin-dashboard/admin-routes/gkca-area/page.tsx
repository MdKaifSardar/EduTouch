"use client";

import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import GKCAUploadForm from "./_component/GKCAUploadForm";
import DisplayGKCAComponent from "./_component/DisplayGKCAComponent";

const Page = () => {
  const [reload, setReload] = useState(false);

  const handleCourseCreated = () => {
    setReload(!reload);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start w-full">
      <ToastContainer />
      <GKCAUploadForm onDocumentsUploaded={handleCourseCreated} />
      <DisplayGKCAComponent reload={reload} />
    </div>
  );
};

export default Page;
