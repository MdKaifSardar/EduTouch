"use client";

import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import VideoDisplay from "./_component/VideoDisplay";
import VideoCreateForm from "./_component/VideoCreateForm";

const Page = () => {
  const [reload, setReload] = useState(false)

  const handleCourseCreated = () => {
    setReload(!reload);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start w-full">
      <ToastContainer />
      <VideoCreateForm onVideoCreated={handleCourseCreated} />
      <VideoDisplay reload={reload} />
    </div>
  );
};

export default Page;
