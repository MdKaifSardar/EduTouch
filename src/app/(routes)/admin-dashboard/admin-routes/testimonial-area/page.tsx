"use client";

import { ToastContainer } from "react-toastify";
import { useState } from "react";
import TestimonialCreateForm from "./_component/TestimonialCreateForm";
import DisplayTesti from "./_component/DisplayTestimonial";

const Page = () => {
  const [reload, setReload] = useState(false);

  const handleCourseCreated = () => {
    setReload(!reload);
  };
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start w-full">
      <ToastContainer />
      <TestimonialCreateForm onTestimonialCreated={handleCourseCreated} />
      <DisplayTesti reload={reload} />
    </div>
  );
};

export default Page;
