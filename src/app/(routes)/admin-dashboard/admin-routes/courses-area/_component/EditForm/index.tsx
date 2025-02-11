"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

interface ICourse {
  _id: string;
  courseName: string;
  courseHighlights: string;
  courseSyllabus: string;
  courseDescription: string;
  courseDuration: string;
  image: string; // Assuming the image URL or path
}

interface EditFormProps {
  item: ICourse;
  onSuccess: () => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ item, onSuccess, onClose }) => {
  const [courseName, setCourseName] = useState(item.courseName);
  const [courseHighlights, setCourseHighlights] = useState(
    item.courseHighlights
  );
  const [courseSyllabus, setCourseSyllabus] = useState(item.courseSyllabus);
  const [courseDescription, setCourseDescription] = useState(
    item.courseDescription
  );
  const [courseDuration, setCourseDuration] = useState(item.courseDuration);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);

  useEffect(() => {
    setCourseName(item.courseName);
    setCourseHighlights(item.courseHighlights);
    setCourseSyllabus(item.courseSyllabus);
    setCourseDescription(item.courseDescription);
    setCourseDuration(item.courseDuration);
  }, [item]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100000) {
      toast.error("Image size must be less than 100KB.");
      e.target.value = "";
      return;
    }

    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      toast.error("Only JPEG image types are allowed.");
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
    formData.append("courseName", courseName);
    formData.append("courseHighlights", courseHighlights);
    formData.append("courseSyllabus", courseSyllabus);
    formData.append("courseDescription", courseDescription);
    formData.append("courseDuration", courseDuration);
    formData.append("id", item._id);

    if (image) {
      formData.append("image", image);
    }

    if (pdf) {
      formData.append("pdf", pdf);
    }

    try {
      const response = await fetch(`/api/course/course-edit`, {
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

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setPdf(file);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto bg-white shadow-md p-6 rounded-lg space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Name
        </label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Highlights
        </label>
        <input
          type="text"
          value={courseHighlights}
          onChange={(e) => setCourseHighlights(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Syllabus
        </label>
        <input
          type="text"
          value={courseSyllabus}
          onChange={(e) => setCourseSyllabus(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Description
        </label>
        <textarea
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Duration
        </label>
        <input
          type="text"
          value={courseDuration}
          onChange={(e) => setCourseDuration(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Banner (JPEG, JPG, PNG only, max 100KB)
        </label>
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleImageChange}
          className="mt-1"
        />
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="image preview"
            className="w-full h-auto object-contain"
            width={300}
            height={200}
          />
        ) : (
          <Image
            className="w-full h-auto object-contain"
            width={300}
            height={200}
            alt={item.courseName}
            src={item.image}
          />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course PDF (must be less than 1MB & in PDF format)
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => handlePDFChange(e)}
          className="mt-1"
        />
      </div>
      <div className="mt-2">
        <a
          href={`/api/course/course-download?id=${item._id}`}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          download="gk.pdf"
        >
          Download Course PDF
        </a>
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
