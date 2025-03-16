"use client";

import { useFetchNotices } from "@/hooks/DisplayAllNotices";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const DisplayAllNotice: React.FC = () => {
  const { notices, fetchNotices, loading } = useFetchNotices();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  const handleViewMore = () => {
    setShowAll(true);
  };

  const handleViewLess = () => {
    setShowAll(false);
  };

  const displayedNotices = showAll ? notices : notices.slice(0, 6);

  return (
    <div className="w-full bg-gradient-to-tl to-[#1481ab] from-[#18244d] flex flex-col justify-center items-center rounded-lg gap-[2rem] p-4">
      <div className="text-4xl text-yellow-500 sm:text-5xl font-bold text-center w-fit">
        Check Notice
      </div>
      {loading ? (
        <LoadingSpinner text="Loading Notices" />
      ) : notices.length > 0 ? (
        <>
          <ul className="flex flex-col justify-center items-center w-full space-y-2">
            {displayedNotices.map((notice, index) => (
              <a
                key={index}
                href={`/api/notice/notice-download?id=${notice._id}`}
                className="text-white hover:underline"
                download={`${notice.noticeTitle}.pdf`}
              >
                {notice.noticeTitle}
              </a>
            ))}
          </ul>
          <div className="mt-[1rem]">
            {!showAll && notices.length > 6 && (
              <button
                onClick={handleViewMore}
                className="underline text-black font-bold hover:text-white font-sans text-[1rem]"
              >
                View More
              </button>
            )}
            {showAll && (
              <button
                onClick={handleViewLess}
                className="underline text-black font-bold hover:text-white font-sans text-[1rem]"
              >
                View Less
              </button>
            )}
          </div>
        </>
      ) : (
        <p>No notices available.</p>
      )}
    </div>
  );
};

export default DisplayAllNotice;
