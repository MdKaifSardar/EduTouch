"use client";

import { useFetchKeyOfferings } from "@/hooks/DisplayAllKeyOfferings";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditForm from "../EditForm";

interface DispPropTypes {
  reload: boolean;
}

const DisplayKeyOfferings = ({ reload }: DispPropTypes) => {
  const { keyOfferings, fetchKeyOfferings, loading } = useFetchKeyOfferings();
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedOfferingId, setSelectedOfferingId] = useState<string | null>(
    null
  );
  const [confirmationName, setConfirmationName] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingOfferingId, setEditingOfferingId] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchKeyOfferings();
  }, [reload, fetchKeyOfferings]);

  const handleDeleteClick = (id: string) => {
    setDeletePopup(true);
    setSelectedOfferingId(id);
  };

  const handleConfirmDelete = async () => {
    if (!selectedOfferingId) return;

    try {
      const formData = new FormData();
      formData.append("id", selectedOfferingId);

      const response = await fetch("/api/keyoffer/keyoffer-delete", {
        method: "DELETE",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Key Offering deleted successfully!");
        fetchKeyOfferings();
      } else {
        toast.error(result.error || "Failed to delete key offering.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error("Network error, please try again later.");
    } finally {
      setDeletePopup(false);
      setSelectedOfferingId(null);
      setConfirmationName("");
    }
  };

  const handleEditClick = (id: string) => {
    setEditingOfferingId(id);
    setShowEditForm(true);
  };

  const handleEditSuccess = () => {
    fetchKeyOfferings();
    setShowEditForm(false);
    setEditingOfferingId(null);
  };

  return (
    <div className="w-full p-4 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Key Offerings</h1>
      {loading && <p>Loading key offerings...</p>}
      {!loading && keyOfferings.length === 0 && (
        <p>No key offerings available.</p>
      )}
      <ul className="w-full space-y-2">
        {keyOfferings.map((item) => (
          <li
            key={item._id}
            className="w-full flex flex-col items-center justify-center bg-white px-4 py-2 rounded shadow"
          >
            <div className="w-full flex flex-row justify-between items-center">
              <span>{item.title}</span>
              <div>
                <button
                  onClick={() => handleEditClick(item._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(item._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                >
                  Delete
                </button>
              </div>
            </div>
            {showEditForm &&
              editingOfferingId &&
              editingOfferingId === item._id && (
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
            <p className="mb-2">
              Enter the key offering name to confirm deletion:
            </p>
            <input
              type="text"
              value={confirmationName}
              onChange={(e) => setConfirmationName(e.target.value)}
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
                disabled={confirmationName.trim() === ""}
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

export default DisplayKeyOfferings;
