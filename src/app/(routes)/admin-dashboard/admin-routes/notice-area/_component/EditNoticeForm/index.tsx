"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface INotice {
  _id: string;
  noticeTitle: string;
  pdf: string; // URL or path of the PDF
}

interface EditNoticeFormProps {
  item: INotice;
  onSuccess: () => void;
  onClose: () => void;
}

const EditNoticeForm: React.FC<EditNoticeFormProps> = ({ item, onSuccess, onClose }) => {
  const [noticeTitle, setNoticeTitle] = useState(item.noticeTitle);
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

  useEffect(() => {
    setNoticeTitle(item.noticeTitle);
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", item._id);
    formData.append("noticeTitle", noticeTitle);
    if (pdf) {
      formData.append("pdf", pdf);
    }

    try {
      const response = await fetch(`/api/notice/notice-edit`, {
        method: "PATCH",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Notice updated successfully.");
        onSuccess();
        onClose();
      } else {
        toast.error(result?.error || "Failed to update notice.");
      }
    } catch (error) {
      console.error("Error during update:", error);
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
          Save Changes
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 ml-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditNoticeForm;
