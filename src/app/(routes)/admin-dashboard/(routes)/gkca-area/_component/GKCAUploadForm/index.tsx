"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface GKCAUploadFormProps {
  onDocumentsUploaded: () => void;
}

const GKCAUploadForm: React.FC<GKCAUploadFormProps> = ({ onDocumentsUploaded }) => {
  const [title, setTitle] = useState("");
  const [gkPDF, setGkPDF] = useState<File | null>(null);
  const [currentAffairsPDF, setCurrentAffairsPDF] = useState<File | null>(null);

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>, type: "gkPDF" | "currentAffairsPDF") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1000000) { // Check if file size is less than 1MB
      toast.error("PDF size must be less than 1MB.");
      e.target.value = "";
      return;
    }

    if (file.type !== "application/pdf") { // Ensure only PDF files are uploaded
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gkPDF || !currentAffairsPDF) {
      toast.error("Please upload valid PDFs.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("gkPDF", gkPDF);
    formData.append("currentAffairsPDF", currentAffairsPDF);

    try {
      const response = await fetch("/api/gkca/gkca-create", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Documents uploaded successfully.");
        onDocumentsUploaded();
        setTitle("");
        setGkPDF(null);
        setCurrentAffairsPDF(null);
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

      {/* GK PDF Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          GK PDF (must be less than 1MB & in PDF format)
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => handlePDFChange(e, "gkPDF")}
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
          onChange={(e) => handlePDFChange(e, "currentAffairsPDF")}
          className="mt-1"
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Upload Documents
        </button>
      </div>
    </form>
  );
};

export default GKCAUploadForm;
