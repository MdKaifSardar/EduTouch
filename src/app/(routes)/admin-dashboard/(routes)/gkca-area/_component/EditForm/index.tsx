"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IGKCurrAff {
  _id: string;
  title: string;
  gkPDF: string; // URL for the General Knowledge PDF
  currentAffairsPDF: string;
}

interface EditFormProps {
  item: IGKCurrAff;
  onSuccess: () => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ item, onSuccess, onClose }) => {
  const [title, setTitle] = useState(item.title);
  const [gkPDF, setGkPDF] = useState<File | null>(null);
  const [currentAffairsPDF, setCurrentAffairsPDF] = useState<File | null>(null);

  useEffect(() => {
    // Initialize form fields with `item` data
    setTitle(item.title);
  }, [item]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      // 1MB in bytes
      toast.error("File size must be less than 1MB.");
      e.target.value = "";
      return;
    }

    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    if (gkPDF) {
      formData.append("gkPDF", gkPDF);
    }
    if (currentAffairsPDF) {
      formData.append("currentAffairsPDF", currentAffairsPDF);
    }
    formData.append("id", item._id);

    try {
      const response = await fetch(`/api/gkca/gkca-edit`, {
        method: "PATCH",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Course updated successfully.");
        onSuccess();
        onClose();
      } else {
        toast.error(result?.error || "Failed to update course.");
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
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          GK PDF (PDF only, max 1mb)
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => handleFileChange(e, setGkPDF)}
          className="mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Current Affairs PDF (PDF only, max 1mb)
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => handleFileChange(e, setCurrentAffairsPDF)}
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

export default EditForm;
