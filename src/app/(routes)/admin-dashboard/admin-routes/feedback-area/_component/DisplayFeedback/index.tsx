"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import EditForm from "../EditForm";
import { useFetchFeedback } from "@/hooks/DisplayAllFeedback";

interface DispPropTypes {
  reload: boolean;
}

const DisplayFeedback = ({ reload }: DispPropTypes) => {
  const { feedbackItems, fetchFeedbackItems, loading } = useFetchFeedback(); // Use the feedbackItems and fetchFeedbackItems
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(null);
  const [confirmationTitle, setConfirmationTitle] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingFeedbackId, setEditingFeedbackId] = useState<string | null>(null);

  useEffect(() => {
    fetchFeedbackItems(); // Fetch feedback items
  }, [reload]);

  const handleDeleteClick = (id: string) => {
    setDeletePopup(true);
    setSelectedFeedbackId(id); // Set the selected feedback ID
  };

  const handleConfirmDelete = async () => {
    if (!selectedFeedbackId) return;

    try {
      const formData = new FormData();
      formData.append("id", selectedFeedbackId);

      const response = await fetch("/api/feedback/feedback-delete", { // Adjusted endpoint
        method: "DELETE",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Feedback item deleted successfully!");
        fetchFeedbackItems(); // Refresh the list after deletion
      } else {
        toast.error(result.error || "Failed to delete feedback item.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error("Network error, please try again later.");
    } finally {
      setDeletePopup(false);
      setSelectedFeedbackId(null);
      setConfirmationTitle("");
    }
  };

  const handleEditClick = (id: string) => {
    setEditingFeedbackId(id); // Set the editing feedback ID
    setShowEditForm(true);
  };

  const handleEditSuccess = () => {
    fetchFeedbackItems(); // Refresh feedback items after editing
    setShowEditForm(false);
    setEditingFeedbackId(null);
  };

  return (
    <div className="w-full p-4 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Feedback</h1>
      {loading && <p>Loading feedback items...</p>}
      {!loading && feedbackItems.length === 0 && (
        <p>No feedback items available.</p>
      )}
      <ul className="w-full flex flex-col justify-center items-center gap-[.5rem]">
        {feedbackItems.map((item) => (
          <li
            key={item._id}
            className="w-full bg-white p-4 rounded shadow space-y-2"
          >
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <div className="flex flex-row gap-[.4rem] justify-center items-center">
                <button
                  onClick={() => handleEditClick(item._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(item._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <Image
              src={item.imageNew} // Assuming imageNew is a URL or Base64 string
              alt={item.name}
              width={300}
              height={200}
              className="rounded object-cover"
            />
            {showEditForm &&
              editingFeedbackId &&
              editingFeedbackId === item._id && (
                <EditForm
                  item={item}
                  onSuccess={handleEditSuccess}
                  onClose={() => setShowEditForm(false)}
                />
              )}
          </li>
        ))}
      </ul>

      {deletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Confirm Deletion</h2>
            <p className="mb-2">Enter the feedback title to confirm deletion:</p>
            <input
              type="text"
              value={confirmationTitle}
              onChange={(e) => setConfirmationTitle(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setDeletePopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleConfirmDelete}
                disabled={confirmationTitle.trim() === ""}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayFeedback;
