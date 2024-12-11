"use client";

import React, { useState } from "react";
import DisplayCourse from "./_component/DisplayTeacher";
import { ToastContainer } from "react-toastify";
import TeacherCreateForm from "./_component/TeacherCreateForm";

const Page = () => {
  const [reload, setReload] = useState(false);

  const handleCourseCreated = () => {
    setReload(!reload);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start w-full">
      <ToastContainer />
      <TeacherCreateForm onTeacherCreated={handleCourseCreated} />
      <DisplayCourse reload={reload} />
    </div>
  );
};

export default Page;
