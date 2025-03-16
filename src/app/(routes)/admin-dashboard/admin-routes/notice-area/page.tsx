"use client";

import { ToastContainer } from "react-toastify";
import DisplayNotices from "./_component/DisplayNotice";
import CreateNotice from "./_component/NoticeCreateForm";
import { useState } from "react";

const Page = () => {
  const [reload, setReload] = useState(false);

  const handleNoticeCreated = () => {
    setReload(!reload);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start w-full">
      <ToastContainer />
      <CreateNotice onNoticeCreated={handleNoticeCreated} />
      <DisplayNotices reload={reload} />
    </div>
  );
};

export default Page;
