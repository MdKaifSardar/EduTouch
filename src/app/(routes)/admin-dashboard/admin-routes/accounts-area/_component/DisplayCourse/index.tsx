"use client";

import { useFetchAdmins } from "@/hooks/DisplayAllAdmins";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditForm from "../EditForm"; // Assuming you have an EditForm component for admins

interface DispPropTypes {
  reload: boolean;
}

const DisplayAdmins = ({ reload }: DispPropTypes) => {
  const { admins, fetchAdmins, loading } = useFetchAdmins();
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingAdminId, setEditingAdminId] = useState<string | null>(null);

  useEffect(() => {
    fetchAdmins();
  }, [reload]);

  const handleDeleteClick = (id: string) => {
    setDeletePopup(true);
    setSelectedAdminId(id);
  };

  const handleConfirmDelete = async () => {
    if (!selectedAdminId) return;

    try {
      const response = await fetch("/api/auth/admin-delete", {
        method: "DELETE",
        body: JSON.stringify({ id: selectedAdminId }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Admin deleted successfully!");
        fetchAdmins();
      } else {
        toast.error(result.error || "Failed to delete admin.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error("Network error, please try again later.");
    } finally {
      setDeletePopup(false);
      setSelectedAdminId(null);
      setConfirmationEmail("");
    }
  };

  const handleEditClick = (id: string) => {
    setEditingAdminId(id);
    setShowEditForm(true);
  };

  const handleEditSuccess = () => {
    fetchAdmins();
    setShowEditForm(false);
    setEditingAdminId(null);
  };

  return (
    <div className="w-full p-4 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Current Admins</h1>
      {loading && <p>Loading admins...</p>}
      {!loading && admins.length === 0 && <p>No admins available.</p>}
      <ul className="w-full space-y-2">
        {admins.map((admin) => (
          <li
            key={admin._id} // Ensure admin._id is unique and not null or undefined
            className="w-full flex flex-col items-center justify-center bg-white px-4 py-2 rounded shadow"
          >
            <div className="w-full flex flex-row justify-between items-center">
              <span>
                {admin.email} {admin.username && `(${admin.username})`}
              </span>
              <div>
                <button
                  onClick={() => handleEditClick(admin._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(admin._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                >
                  Delete
                </button>
              </div>
            </div>
            {showEditForm && editingAdminId === admin._id && (
              <EditForm
                item={admin}
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
            <p className="mb-2">Enter the admin email to confirm deletion:</p>
            <input
              type="text"
              value={confirmationEmail}
              onChange={(e) => setConfirmationEmail(e.target.value)}
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
                disabled={confirmationEmail.trim() === ""}
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

export default DisplayAdmins;
