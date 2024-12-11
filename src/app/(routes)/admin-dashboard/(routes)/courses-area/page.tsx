"use client";

import React, { useState } from "react";
import CourseCreateForm from "./_component/CourseCreateForm";
import DisplayCourse from "./_component/DisplayCourse";
import { ToastContainer } from "react-toastify";

const Page = () => {
  const [reload, setReload] = useState(false)

  const handleCourseCreated = () => {
    setReload(!reload);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start w-full">
      <ToastContainer />
      <CourseCreateForm onCourseCreated={handleCourseCreated} />
      <DisplayCourse reload={reload} />
    </div>
  );
};

export default Page;
