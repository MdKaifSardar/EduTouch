"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IGKCurrAff {
  _id: string;
  title: string;
  gkImage: string;
  caImage: string;
  gkTitle: string;
  caTitle: string;
  gkLink: string;
  caLink: string;
}

interface EditFormProps {
  item: IGKCurrAff;
  onSuccess: () => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ item, onSuccess, onClose }) => {
  const [title, setTitle] = useState(item.title);
  const [gkTitle, setGkTitle] = useState(item.gkTitle);
  const [caTitle, setCaTitle] = useState(item.caTitle);
  const [gkLink, setGkLink] = useState(item.gkLink);
  const [caLink, setCaLink] = useState(item.caLink);
  const [gkImage, setGkImage] = useState<File | null>(null);
  const [caImage, setCaImage] = useState<File | null>(null);
  const [gkImagePreview, setGkImagePreview] = useState<string>(item.gkImage);
  const [caImagePreview, setCaImagePreview] = useState<string>(item.caImage);

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
    formData.append("gkTitle", gkTitle);
    formData.append("caTitle", caTitle);
    formData.append("gkLink", gkLink);
    formData.append("caLink", caLink);
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
        toast.success("Details updated successfully.");
        onSuccess();
        onClose();
      } else {
        toast.error(result?.error || "Failed to update details.");
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
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      {/* GK Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          GK Title
        </label>
        <input
          type="text"
          value={gkTitle}
          onChange={(e) => setGkTitle(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      {/* CA Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          CA Title
        </label>
        <input
          type="text"
          value={caTitle}
          onChange={(e) => setCaTitle(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      {/* GK Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          GK Link
        </label>
        <input
          type="text"
          value={gkLink}
          onChange={(e) => setGkLink(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      {/* CA Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          CA Link
        </label>
        <input
          type="text"
          value={caLink}
          onChange={(e) => setCaLink(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      {/* GK Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          GK Image (less than 100KB, JPG/PNG)
        </label>
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={(e) => handleImageChange(e, "gkImage")}
          className="mt-1"
        />
        {gkImagePreview && (
          <img src={gkImagePreview} alt="GK Preview" className="mt-2 w-full" />
        )}
      </div>

      {/* CA Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          CA Image (less than 100KB, JPG/PNG)
        </label>
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={(e) => handleImageChange(e, "caImage")}
          className="mt-1"
        />
        {caImagePreview && (
          <img src={caImagePreview} alt="CA Preview" className="mt-2 w-full" />
        )}
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
