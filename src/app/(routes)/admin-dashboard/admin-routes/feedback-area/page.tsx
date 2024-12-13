"use client";

import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import FeedbackForm from "./_component/FeedbackForm";
import DisplayFeedback from "./_component/DisplayFeedback";

const Page = () => {
  const [reload, setReload] = useState(false);

  const handleCourseCreated = () => {
    setReload(!reload);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start w-full">
      <ToastContainer />
      <FeedbackForm onFeedbackSubmitted={handleCourseCreated} />
      <DisplayFeedback reload={reload} />
    </div>
  );
};

export default Page;
