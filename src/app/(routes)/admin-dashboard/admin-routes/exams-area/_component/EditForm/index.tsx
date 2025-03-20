"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IExam {
  _id: string;
  examName: string;
  officialSiteLink: string;
  courseSyllabus: string;
  description: string;
  examDate: string;
  image: string; // URL or path of the logo
  pdf?: string; // URL or path of the PDF
  qualifications?: string;
  selectionProcess?: string;
  formFillUpDate?: string; // Store as string
  pdfDownloadLink?: { url: string }; // Add this line
}

interface EditFormProps {
  item: IExam;
  onSuccess: () => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ item, onSuccess, onClose }) => {
  const [examName, setExamName] = useState(item.examName);
  const [officialSiteLink, setOfficialSiteLink] = useState(
    item.officialSiteLink
  );
  const [courseSyllabus, setCourseSyllabus] = useState(item.courseSyllabus);
  const [description, setDescription] = useState(item.description);
  const [examDate, setExamDate] = useState(item.examDate);
  const [image, setImage] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [qualifications, setQualifications] = useState(
    item.qualifications || ""
  );
  const [selectionProcess, setSelectionProcess] = useState(
    item.selectionProcess || ""
  );
  const [formFillUpDate, setFormFillUpDate] = useState(
    item.formFillUpDate || ""
  );

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

  useEffect(() => {
    // Initialize form fields with `item` data
    setExamName(item.examName);
    setOfficialSiteLink(item.officialSiteLink);
    setCourseSyllabus(item.courseSyllabus);
    setDescription(item.description);
    setExamDate(item.examDate);
  }, [item]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100000) {
      toast.error("Logo size must be less than 100KB.");
      e.target.value = "";
      return;
    }

    if (!["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only JPG image types are allowed.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (examName) formData.append("examName", examName);
    if (officialSiteLink) formData.append("officialSiteLink", officialSiteLink);
    if (courseSyllabus) formData.append("courseSyllabus", courseSyllabus);
    if (description) formData.append("description", description);
    if (examDate) formData.append("examDate", examDate); // Convert Date to string
    formData.append("id", item._id);

    if (image) {
      formData.append("image", image);
    }

    if (pdf) {
      formData.append("pdf", pdf);
    }
    formData.append("qualifications", qualifications);
    formData.append("selectionProcess", selectionProcess);
    formData.append("formFillUpDate", formFillUpDate);

    try {
      const response = await fetch(`/api/exam/exam-edit`, {
        method: "PATCH",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Exam updated successfully.");
        onSuccess();
        onClose();
      } else {
        toast.error(result?.error || "Failed to update exam.");
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
          Qualifications
        </label>
        <input
          type="text"
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Form Fill-Up Date
        </label>
        <input
          type="text"
          value={formFillUpDate}
          onChange={(e) => setFormFillUpDate(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
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
        />
      </div>

      <div className="mt-2">
        <a
          href={`/api/exam/exam-download?id=${item._id}`}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          download="gk.pdf"
        >
          Download Exam Pdf
        </a>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Logo (JPEG, JPG, PNG only, max 100KB)
        </label>
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          onChange={handleLogoChange}
          className="mt-1"
        />
        {logoPreview ? (
          <div className="mt-2">
            <Image
              width={300}
              height={200}
              src={logoPreview}
              alt="Logo Preview"
              className="w-full h-auto object-contain"
            />
          </div>
        ) : (
          <Image
            className="w-full h-auto object-contain"
            width={300}
            height={200}
            alt={item.examName}
            src={item.image}
          />
        )}
      </div>

      {/* <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Syllabus
        </label>
        <input
          type="text"
          value={courseSyllabus}
          onChange={(e) => setCourseSyllabus(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
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
        />
      </div> */}

      {/* <div>
        <label className="block text-sm font-medium text-gray-700">
          Exam Date: {examDate ? examDate.split("T")[0] : ""}
        </label>
        <input
          type="date"
          value={examDate ? examDate.split("T")[0] : ""}
          onChange={(e) => setExamDate(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div> */}

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
