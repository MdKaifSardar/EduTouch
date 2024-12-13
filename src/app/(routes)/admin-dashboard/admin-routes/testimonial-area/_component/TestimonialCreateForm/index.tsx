"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TestimonialCreateFormProps {
  onTestimonialCreated: () => void;
}

const TestimonialCreateForm: React.FC<TestimonialCreateFormProps> = ({
  onTestimonialCreated,
}) => {
  const [studentName, setStudentName] = useState("");
  const [rank, setRank] = useState("");
  const [examName, setExamName] = useState("");
  const [testimonial, setTestimonial] = useState("");
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
      toast.error("Please upload a valid student image.");
      return;
    }

    const formData = new FormData();
    formData.append("studentName", studentName);
    formData.append("rank", rank);
    formData.append("examName", examName);
    formData.append("testimonial", testimonial);
    formData.append("image", image);

    try {
      const response = await fetch("/api/testimonial/testimonial-create", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Testimonial created successfully.");
        onTestimonialCreated(); // Notify parent component
        setStudentName("");
        setRank("");
        setExamName("");
        setTestimonial("");
        setImage(null);
        setImagePreview(null);
      } else {
        toast.error(result?.error || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Failed to create testimonial:", error);
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
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Rank</label>
        <input
          type="text"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Exam Name
        </label>
        <input
          type="text"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          required
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
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Student Image
        </label>
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleImageChange}
          className="mt-1 p-2 w-full"
          required
        />
        {imagePreview && (
          <div className="mt-2">
            <Image
              src={imagePreview}
              alt="Preview"
              width={300}
              height={300}
              className="w-[50%] h-auto object-cover"
            />
          </div>
        )}
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Submit Testimonial
        </button>
      </div>
    </form>
  );
};

export default TestimonialCreateForm;
