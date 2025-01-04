"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ICourse {
  _id: string;
  title: string;
  image: string;
}

interface EditFormProps {
  item: ICourse;
  onSuccess: () => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ item, onSuccess, onClose }) => {
  const [title, setTitle] = useState(item.title);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // Set image preview from the provided item if it exists
    setImagePreview(item.image);
  }, [item.image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1000000) {
      toast.error("Image size must be less than 1MB.");
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
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    if (image) {
      formData.append("image", image);
    }
    formData.append("id", item._id);

    try {
      const response = await fetch(`/api/heroPoster/heroPoster-edit`, {
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
        <label className="block text-sm font-medium text-gray-700">
          Poster Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Poster (JPEG/JPG/PNG only, max 1MB)
        </label>
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleImageChange}
          className="mt-1"
        />
        {imagePreview ? (
          <div className="mt-2">
            <Image
              width={300}
              height={200}
              src={imagePreview}
              alt="Course Banner Preview"
              className="w-full h-auto object-contain"
            />
          </div>
        ) : (
          <div className="mt-2">
            <Image
              width={300}
              height={200}
              src={item.image}
              alt="Existing Course Banner"
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
