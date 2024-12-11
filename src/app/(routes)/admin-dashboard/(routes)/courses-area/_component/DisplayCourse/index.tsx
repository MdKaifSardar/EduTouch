"use client";

import { useFetchCourses } from "@/hooks/DisplayAllCourses";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditForm from "../EditForm";

interface DispPropTypes {
  reload: boolean;
}

const DisplayCourse = ({ reload }: DispPropTypes) => {
  const { courses, fetchCourses, loading } = useFetchCourses();
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [confirmationName, setConfirmationName] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, [reload]);

  const handleDeleteClick = (id: string) => {
    setDeletePopup(true);
    setSelectedCourseId(id);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCourseId) return;

    try {
      const formData = new FormData();
      formData.append("id", selectedCourseId);

      const response = await fetch("/api/course/course-delete", {
        method: "DELETE",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Course deleted successfully!");
        fetchCourses();
      } else {
        toast.error(result.error || "Failed to delete course.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error("Network error, please try again later.");
    } finally {
      setDeletePopup(false);
      setSelectedCourseId(null);
      setConfirmationName("");
    }
  };

  const handleEditClick = (id: string) => {
    setEditingCourseId(id);
    setShowEditForm(true);
  };

  const handleEditSuccess = () => {
    fetchCourses();
    setShowEditForm(false);
    setEditingCourseId(null);
  };

  return (
    <div className="w-full p-4 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">All Courses</h1>
      {loading && <p>Loading courses...</p>}
      {!loading && courses.length === 0 && <p>No courses available.</p>}
      <ul className="w-full space-y-2">
        {courses.map((item) => (
          <li
            key={item._id}
            className="w-full flex flex-col items-center justify-center bg-white px-4 py-2 rounded shadow"
          >
            <div className="w-full flex flex-row justify-between items-center">
              <span>{item.courseName}</span>
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
              editingCourseId &&
              editingCourseId === item._id && (
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
            <p className="mb-2">Enter the course name to confirm deletion:</p>
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

export default DisplayCourse;
