"use client";

import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import AdminCreateForm from "./_component/AdminCreateForm";
import DisplayAdmins from "./_component/DisplayCourse";

const Page = () => {
  const [reload, setReload] = useState(false);

  const handleCourseCreated = () => {
    setReload(!reload);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start w-full">
      <ToastContainer />
      <AdminCreateForm onAdminCreated={handleCourseCreated} />
      <DisplayAdmins reload={reload} />
    </div>
  );
};

export default Page;
