"use client";

import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ITestimonial {
  _id: string;
  studentName: string;
  // rank: string;
  examName: string;
  testimonial: string;
  image: string; // URL or path of the student image
}

interface EditFormProps {
  item: ITestimonial;
  onSuccess: () => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ item, onSuccess, onClose }) => {
  const [studentName, setStudentName] = useState(item.studentName);
  // const [rank, setRank] = useState(item.rank);
  const [examName, setExamName] = useState(item.examName);
  const [testimonial, setTestimonial] = useState(item.testimonial);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100000) {
      toast.error("Image size must be less than 100KB.");
      e.target.value = "";
      return;
    }

    if (!["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
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
    formData.append("id", item._id);
    if (studentName) formData.append("studentName", studentName);
    // if (rank) formData.append("rank", rank);
    if (examName) formData.append("examName", examName);
    if (testimonial) formData.append("testimonial", testimonial);
    if (image) formData.append("image", image);

    try {
      const response = await fetch(`/api/testimonial/testimonial-edit`, {
        method: "PATCH",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Testimonial updated successfully.");
        onSuccess();
        onClose();
      } else {
        toast.error(result?.error || "Failed to update testimonial.");
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
          Student Name
        </label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      {/* <div>
        <label className="block text-sm font-medium text-gray-700">Rank</label>
        <input
          type="text"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div> */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Exam Name
        </label>
        <input
          type="text"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Testimonial
        </label>
        <textarea
          value={testimonial}
          onChange={(e) => setTestimonial(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Student Image (JPEG, JPG, PNG only, max 100KB)
        </label>
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          onChange={handleImageChange}
          className="mt-1"
        />
        {imagePreview ? (
          <div className="mt-2">
            <Image
              width={300}
              height={200}
              src={imagePreview}
              alt="Image Preview"
              className="w-full h-auto object-contain"
            />
          </div>
        ) : (
          <Image
            className="w-full h-auto object-contain"
            width={300}
            height={200}
            alt={item.studentName}
            src={item.image}
          />
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
