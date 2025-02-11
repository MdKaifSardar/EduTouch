"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CreateExamProps {
  onExamCreated: () => void;
}

const CreateExam: React.FC<CreateExamProps> = ({ onExamCreated }) => {
  const [examName, setExamName] = useState("");
  const [officialSiteLink, setOfficialSiteLink] = useState("");
  const [courseSyllabus, setCourseSyllabus] = useState("");
  const [description, setDescription] = useState("");
  const [examDate, setExamDate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [qualifications, setQualifications] = useState("");
  const [selectionProcess, setSelectionProcess] = useState("");
  const [formFillUpDate, setFormFillUpDate] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload a valid logo.");
      return;
    }

    const formData = new FormData();
    formData.append("examName", examName);
    formData.append("officialSiteLink", officialSiteLink);
    formData.append("courseSyllabus", courseSyllabus);
    formData.append("description", description);
    formData.append("examDate", examDate);
    formData.append("image", image);
    if (pdf) {
      formData.append("pdf", pdf);
    }
    formData.append("qualifications", qualifications);
    formData.append("selectionProcess", selectionProcess);
    formData.append("formFillUpDate", formFillUpDate);

    try {
      const response = await fetch("/api/exam/exam-create", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Exam created successfully.");
        onExamCreated();
        setExamName("");
        setOfficialSiteLink("");
        setCourseSyllabus("");
        setDescription("");
        setExamDate("");
        setImage(null);
        setImagePreview(null);
        setPdf(null);
        setQualifications("");
        setSelectionProcess("");
        setFormFillUpDate("");
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
          Qualifications
        </label>
        <input
          type="text"
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Form Fill-Up Date
        </label>
        <input
          type="date"
          value={formFillUpDate}
          onChange={(e) => setFormFillUpDate(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Selection Process
        </label>
        <textarea
          value={selectionProcess}
          onChange={(e) => setSelectionProcess(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Official Site Link
        </label>
        <input
          type="url"
          value={officialSiteLink}
          onChange={(e) => setOfficialSiteLink(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Exam PDF (must be less than 1MB & in PDF format)
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => handlePDFChange(e)}
          className="mt-1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Upload Exam Logo Image (JPG, JPEG, PNG only, max 100KB)
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
              src={imagePreview}
              width={300}
              height={200}
              alt="Logo Preview"
              className="w-full h-auto object-contain"
            />
          </div>
        )}
      </div>

      {/* <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Syllabus
        </label>
        <textarea
          value={courseSyllabus}
          onChange={(e) => setCourseSyllabus(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          rows={3}
          required
        />
      </div> */}

      {/* <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          rows={3}
          required
        />
      </div> */}

      {/* <div>
        <label className="block text-sm font-medium text-gray-700">
          Exam Date
        </label>
        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div> */}
      <div className="text-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Create Exam
        </button>
      </div>
    </form>
  );
};

export default CreateExam;
