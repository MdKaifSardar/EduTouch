"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IGKCurrAff {
  _id: string;
  title: string;
  gkPDF: string; // URL for the General Knowledge PDF
  currentAffairsPDF: string;
  gkImage: string; // URL for the General Knowledge image
  caImage: string; // URL for the Current Affairs image
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
  const [gkImage, setGkImage] = useState<File | null>(null);
  const [caImage, setCaImage] = useState<File | null>(null);
  const [gkImagePreview, setGkImagePreview] = useState<string | null>(
    item.gkImage || null
  );
  const [caImagePreview, setCaImagePreview] = useState<string | null>(
    item.caImage || null
  );

  useEffect(() => {
    // Initialize form fields with `item` data
    setTitle(item.title);
    setGkImagePreview(item.gkImage);
    setCaImagePreview(item.caImage);
  }, [item]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "gkPDF" | "currentAffairsPDF"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1000000) {
      // Check if file size is less than 1MB
      toast.error("PDF size must be less than 1MB.");
      e.target.value = "";
      return;
    }

    if (file.type !== "application/pdf") {
      // Ensure only PDF files are uploaded
      toast.error("Only PDF files are allowed.");
      e.target.value = "";
      return;
    }

    if (type === "gkPDF") {
      setGkPDF(file);
    } else {
      setCurrentAffairsPDF(file);
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "gkImage" | "caImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100000) {
      toast.error("Image size must be less than 100KB.");
      e.target.value = "";
      return;
    }

    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      toast.error("Only JPG, JPEG, or PNG image types are allowed.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (type === "gkImage") {
        setGkImagePreview(reader.result as string);
      } else {
        setCaImagePreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);

    if (type === "gkImage") {
      setGkImage(file);
    } else {
      setCaImage(file);
    }
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
    if (gkImage) {
      formData.append("gkImage", gkImage);
    }
    if (caImage) {
      formData.append("caImage", caImage);
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

      {/* GK PDF Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          GK PDF (must be less than 1MB & in PDF format)
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => handleFileChange(e, "gkPDF")}
          className="mt-1"
        />
      </div>

      {/* Current Affairs PDF Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Current Affairs PDF (must be less than 1MB & in PDF format)
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => handleFileChange(e, "currentAffairsPDF")}
          className="mt-1"
        />
      </div>

      {/* GK Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          GK Image (must be less than 100KB & in JPG, JPEG, PNG format)
        </label>
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={(e) => handleImageChange(e, "gkImage")}
          className="mt-1"
        />
        {gkImagePreview && (
          <div className="mt-2">
            <img
              src={gkImagePreview}
              alt="GK Image Preview"
              className="w-full h-auto object-contain"
            />
          </div>
        )}
      </div>

      {/* CA Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Current Affairs Image (must be less than 100KB & in JPG, JPEG, PNG
          format)
        </label>
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={(e) => handleImageChange(e, "caImage")}
          className="mt-1"
        />
        {caImagePreview && (
          <div className="mt-2">
            <img
              src={caImagePreview}
              alt="CA Image Preview"
              className="w-full h-auto object-contain"
            />
          </div>
        )}
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
