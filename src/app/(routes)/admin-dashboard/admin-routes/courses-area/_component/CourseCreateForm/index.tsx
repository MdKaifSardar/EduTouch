"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CourseCreateFormProps {
  onCourseCreated: () => void;
}

const CourseCreateForm: React.FC<CourseCreateFormProps> = ({
  onCourseCreated,
}) => {
  const [courseName, setCourseName] = useState("");
  const [courseHighlights, setCourseHighlights] = useState("");
  const [courseSyllabus, setCourseSyllabus] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload a valid image.");
      return;
    }

    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("courseHighlights", courseHighlights);
    formData.append("courseSyllabus", courseSyllabus);
    formData.append("courseDescription", courseDescription);
    formData.append("courseDuration", courseDuration);
    formData.append("image", image);

    if (pdf) {
      formData.append("pdf", pdf);
    }

    try {
      const response = await fetch("/api/course/course-create", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Course created successfully.");
        onCourseCreated(); // Notify parent component
        setCourseName("");
        setCourseHighlights("");
        setCourseSyllabus("");
        setCourseDescription("");
        setCourseDuration("");
        setImage(null);
        setImagePreview(null);
        setPdf(null);
      } else {
        toast.error(result?.error || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error details:", error); // Logs the error details
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
          Course Name
        </label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          required
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
          required
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
          required
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
          required
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
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Banner (JPEG/JPG/PNG only, max 100KB)
        </label>
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleImageChange}
          className="mt-1"
        />
        {imagePreview && (
          <div className="mt-2">
            <Image
              width={300}
              height={200}
              src={imagePreview}
              alt="Course Banner Preview"
              className="w-full h-auto object-cover"
            />
          </div>
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
          required
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Create Course
        </button>
      </div>
    </form>
  );
};

export default CourseCreateForm;
