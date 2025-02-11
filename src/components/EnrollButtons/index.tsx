"use client";

import Link from "next/link";
import React, { useState } from "react";

const EnrollButtons = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleEnrollNowClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-[1rem] md:gap-[2rem] w-full">
      <Link
        href="/#videoLessons"
        className="hover:bg-[#ffba52] bg-[#FF9700] text-white p-[1rem] rounded-lg text-center font-semibold font-sans text-xl"
      >
        Demo Class
      </Link>
      <button
        onClick={handleEnrollNowClick}
        className="hover:bg-blue-500 text-white p-[1rem] rounded-lg text-center font-semibold font-sans text-xl bg-[#3554bb]"
      >
        Enroll Now
      </button>
      <Link
        href="/contact#contactForm"
        className="hover:bg-[#ffba52] bg-[#FF9700] text-white p-[1rem] rounded-lg text-center font-semibold font-sans text-xl"
      >
        Book a Consultation
      </Link>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[30%] shadow-lg flex flex-col gap-4 relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-2xl font-bold"
            >
              &times;
            </button>
            <p className="text-center">Choose your mode of enrollment:</p>
            <div className="flex justify-around mt-4">
              <Link
                href="/contact"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
              >
                Offline
              </Link>
              <a
                href="https://play.google.com/store/apps/details?id=co.thanos.arsgp&hl=en_IN"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
              >
                Online
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollButtons;
