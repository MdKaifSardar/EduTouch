"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CreateNoticeProps {
  onNoticeCreated: () => void;
}

const CreateNotice: React.FC<CreateNoticeProps> = ({ onNoticeCreated }) => {
  const [noticeTitle, setNoticeTitle] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1000000) {
      toast.error("PDF size must be less than 1MB.");
      e.target.value = "";
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      e.target.value = "";
      return;
    }
    setPdf(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("noticeTitle", noticeTitle);
    if (pdf) {
      formData.append("pdf", pdf);
    }

    try {
      const response = await fetch(`/api/notice/notice-create`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Notice created successfully.");
        onNoticeCreated();
      } else {
        toast.error(result?.error || "Failed to create notice.");
      }
    } catch (error) {
      console.error("Error during creation:", error);
      toast.error("Network error, please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto bg-white shadow-md p-6 rounded-lg space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notice Title
        </label>
        <input
          type="text"
          value={noticeTitle}
          onChange={(e) => setNoticeTitle(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notice PDF (must be less than 1MB & in PDF format)
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => handlePDFChange(e)}
          className="mt-1"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Create Notice
        </button>
      </div>
    </form>
  );
};

export default CreateNotice;
