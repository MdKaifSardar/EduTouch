"use client";

import { ToastContainer } from "react-toastify";
import DisplayExams from "./_component/DisplayExam";
import CreateExam from "./_component/ExamCreateForm";
import { useState } from "react";

const Page = () => {
  const [reload, setReload] = useState(false);

  const handleCourseCreated = () => {
    setReload(!reload);
  };
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start w-full">
      <ToastContainer />
      <CreateExam onExamCreated={handleCourseCreated} />
      <DisplayExams reload={reload} />
    </div>
  );
};

export default Page;
