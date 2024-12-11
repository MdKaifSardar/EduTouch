"use client";

import { useFetchTeachers } from "@/hooks/DisplayAllTeachers";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditForm from "../EditForm";
import Image from "next/image";

interface DispPropTypes {
  reload: boolean; // A required boolean
}

const DisplayTeacher = ({ reload }: DispPropTypes) => {
  const { teachers, fetchTeachers, loading } = useFetchTeachers(); // Destructure values from the hook
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    null
  );
  const [confirmationName, setConfirmationName] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null);

  useEffect(() => {
    fetchTeachers(); // Trigger fetching teachers on mount
  }, [reload]);

  const handleDeleteClick = (id: string) => {
    setDeletePopup(true);
    setSelectedTeacherId(id);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTeacherId) return;

    try {
      const formData = new FormData();
      formData.append("id", selectedTeacherId);

      const response = await fetch("/api/teacher/teacher-delete", {
        method: "DELETE",
        body: formData, // Send FormData payload instead of JSON
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Teacher deleted successfully!");
        fetchTeachers(); // Refresh teachers after deletion
      } else {
        toast.error(result.error || "Failed to delete teacher.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error("Network error, please try again later.");
    } finally {
      setDeletePopup(false);
      setSelectedTeacherId(null);
      setConfirmationName("");
    }
  };

  const handleEditClick = (id: string) => {
    setEditingTeacherId(id);
    setShowEditForm(true);
  };

  const handleEditSuccess = () => {
    fetchTeachers();
    setShowEditForm(false);
    setEditingTeacherId(null);
  };

  return (
    <div className="w-full p-4 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">All Teachers</h1>
      {loading && <p>Loading Teachers...</p>}
      {!loading && teachers.length === 0 && <p>No Teachers Exist.</p>}
      <ul className="space-y-2">
        {teachers.map((item) => (
          <li
            key={item._id}
            className="flex flex-col bg-white px-4 py-2 rounded shadow"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Image
                  src={item.image}
                  alt={item.teacherName}
                  width={200}
                  height={200}
                  className="w-[5rem] h-[5rem] border-[1px] border-black rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{item.teacherName}</p>
                  <p className="text-gray-600 text-sm">{item.subject}</p>
                </div>
              </div>
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

            {showEditForm && editingTeacherId === item._id && (
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
            <p className="mb-2">Enter the teacher name to confirm deletion:</p>
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

export default DisplayTeacher;
