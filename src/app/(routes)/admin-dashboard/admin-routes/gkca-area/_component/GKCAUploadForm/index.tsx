"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface GKCAUploadFormProps {
  onDocumentsUploaded: () => void;
}

const GKCAUploadForm: React.FC<GKCAUploadFormProps> = ({
  onDocumentsUploaded,
}) => {
  const [title, setTitle] = useState("");
  const [gkTitle, setGkTitle] = useState("");
  const [caTitle, setCaTitle] = useState("");
  const [gkLink, setGkLink] = useState("");
  const [caLink, setCaLink] = useState("");
  const [gkImage, setGkImage] = useState<File | null>(null);
  const [caImage, setCaImage] = useState<File | null>(null);
  const [gkImagePreview, setGkImagePreview] = useState<string | null>(null);
  const [caImagePreview, setCaImagePreview] = useState<string | null>(null);

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

    if (
      !title ||
      !gkTitle ||
      !caTitle ||
      !gkLink ||
      !caLink ||
      !gkImage ||
      !caImage
    ) {
      toast.error("Please fill all fields and upload valid images.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("gkTitle", gkTitle);
    formData.append("caTitle", caTitle);
    formData.append("gkLink", gkLink);
    formData.append("caLink", caLink);
    formData.append("gkImage", gkImage);
    formData.append("caImage", caImage);

    try {
      const response = await fetch("/api/gkca/gkca-create", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Data uploaded successfully.");
        onDocumentsUploaded();
        setTitle("");
        setGkTitle("");
        setCaTitle("");
        setGkLink("");
        setCaLink("");
        setGkImage(null);
        setCaImage(null);
        setGkImagePreview(null);
        setCaImagePreview(null);
      } else {
        toast.error(result?.error || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error details:", error);
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
          required
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
          required
        />
      </div>

      {/* CA Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Current Affairs Title
        </label>
        <input
          type="text"
          value={caTitle}
          onChange={(e) => setCaTitle(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      {/* GK Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          GK Link
        </label>
        <input
          type="url"
          value={gkLink}
          onChange={(e) => setGkLink(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      {/* CA Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Current Affairs Link
        </label>
        <input
          type="url"
          value={caLink}
          onChange={(e) => setCaLink(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      {/* GK Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          GK Image (less than 100KB)
        </label>
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={(e) => handleImageChange(e, "gkImage")}
          className="mt-1"
          required
        />
        {gkImagePreview && (
          <img
            src={gkImagePreview}
            alt="GK Preview"
            className="w-full h-auto mt-2 object-contain"
          />
        )}
      </div>

      {/* CA Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Current Affairs Image (less than 100KB)
        </label>
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={(e) => handleImageChange(e, "caImage")}
          className="mt-1"
          required
        />
        {caImagePreview && (
          <img
            src={caImagePreview}
            alt="CA Preview"
            className="w-full h-auto mt-2 object-contain"
          />
        )}
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Upload Data
        </button>
      </div>
    </form>
  );
};

export default GKCAUploadForm;
