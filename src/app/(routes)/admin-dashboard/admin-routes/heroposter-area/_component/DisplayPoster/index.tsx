"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import EditForm from "../EditForm";
import { useFetchHeroPosters } from "@/hooks/DisplayAllPosters";

interface DispPropTypes {
  reload: boolean;
}

const DisplayPoster = ({ reload }: DispPropTypes) => {
  const { heroPosters, fetchHeroPosters, loading } = useFetchHeroPosters();
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedPosterId, setSelectedPosterId] = useState<string | null>(null);
  const [confirmationTitle, setConfirmationTitle] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingPosterId, setEditingPosterId] = useState<string | null>(null);

  useEffect(() => {
    fetchHeroPosters();
  }, [reload]);

  const handleDeleteClick = (id: string) => {
    setDeletePopup(true);
    setSelectedPosterId(id);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPosterId) return;

    try {
      const formData = new FormData();
      formData.append("id", selectedPosterId);

      const response = await fetch("/api/heroPoster/heroPoster-delete", {
        method: "DELETE",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Poster deleted successfully!");
        fetchHeroPosters();
      } else {
        toast.error(result.error || "Failed to delete poster.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error("Network error, please try again later.");
    } finally {
      setDeletePopup(false);
      setSelectedPosterId(null);
      setConfirmationTitle("");
    }
  };

  const handleEditClick = (id: string) => {
    setEditingPosterId(id);
    setShowEditForm(true);
  };

  const handleEditSuccess = () => {
    fetchHeroPosters();
    setShowEditForm(false);
    setEditingPosterId(null);
  };

  return (
    <div className="w-full p-4 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Hero Posters</h1>
      {loading && <p>Loading hero posters...</p>}
      {!loading && heroPosters.length === 0 && (
        <p>No hero posters available.</p>
      )}
      <ul className="w-full flex flex-col justify-center items-center gap-[.5rem]">
        {heroPosters.map((poster) => (
          <li
            key={poster._id}
            className="w-full bg-white p-4 rounded shadow space-y-2"
          >
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-lg font-semibold">{poster.title}</h2>
              <div className="flex flex-row gap-[.4rem] justify-center items-center">
                <button
                  onClick={() => handleEditClick(poster._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(poster._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <Image
              src={poster.image}
              alt={poster.title}
              width={300}
              height={200}
              className="rounded object-cover"
            />
            {showEditForm &&
              editingPosterId &&
              editingPosterId === poster._id && (
                <EditForm
                  item={poster}
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
            <p className="mb-2">Enter the poster title to confirm deletion:</p>
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

export default DisplayPoster;
