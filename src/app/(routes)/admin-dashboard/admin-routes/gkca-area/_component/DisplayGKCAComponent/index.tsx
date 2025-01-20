"use client";

import { useFetchGKCA } from "@/hooks/DisplayAllGkca";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditForm from "../EditForm";

// interface GKCAItem {
//   _id: string;
//   title: string;
// }

interface GKCAListProps {
  reload: boolean;
}

const DisplayGKCAComponent = ({ reload }: GKCAListProps) => {
  const { gkcaAllList, fetchGKCA, loading } = useFetchGKCA();
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedGKCAId, setSelectedGKCAId] = useState<string | null>(null);
  const [confirmationName, setConfirmationName] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingGKCAId, setEditingGKCAId] = useState<string | null>(null);

  useEffect(() => {
    fetchGKCA();
  }, [reload]);

  const handleDeleteClick = (id: string) => {
    setDeletePopup(true);
    setSelectedGKCAId(id);
  };

  const handleConfirmDelete = async () => {
    if (!selectedGKCAId) return;

    try {
      const formData = new FormData();
      formData.append("id", selectedGKCAId);

      const response = await fetch("/api/gkca/gkca-delete", {
        method: "DELETE",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "GKCA deleted successfully!");
        fetchGKCA();
      } else {
        toast.error(result.error || "Failed to delete GKCA.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error("Network error, please try again later.");
    } finally {
      setDeletePopup(false);
      setSelectedGKCAId(null);
      setConfirmationName("");
    }
  };

  const handleEditClick = (id: string) => {
    setEditingGKCAId(id);
    setShowEditForm(true);
  };

  const handleEditSuccess = () => {
    fetchGKCA();
    setShowEditForm(false);
    setEditingGKCAId(null);
  };

  return (
    <div className="w-full p-4 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">
        General Knowledge & Current Affairs
      </h1>
      {loading && <p>Loading data...</p>}
      {!loading && gkcaAllList.length === 0 && <p>No data available.</p>}

      <ul className="space-y-4">
        {gkcaAllList.map((item) => (
          <li
            key={item._id}
            className="bg-white px-4 py-2 rounded shadow flex flex-col"
          >
            <div className="w-full flex justify-between items-center">
              <span className="text-lg font-semibold">{item.title}</span>
              <div className="space-x-2">
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
            <div className="flex space-x-2 mb-2">
              <a
                href={item.gkLink}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View GK
              </a>
              <a
                href={item.caLink}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                View CA
              </a>
            </div>
            {showEditForm && editingGKCAId === item._id && (
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
              Enter the title of the item to confirm deletion:
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

export default DisplayGKCAComponent;
