"use client";

import { useFetchYouTubeVideos } from "@/hooks/DisplayAllVideos";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditForm from "../EditForm";
import Link from "next/link";

interface VideoDisplayProps {
  reload: boolean;
}

const VideoDisplay = ({ reload }: VideoDisplayProps) => {
  const { videos, fetchVideos, loading } = useFetchYouTubeVideos();
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [confirmationName, setConfirmationName] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos();
  }, [reload]);

  const handleDeleteClick = (id: string) => {
    setDeletePopup(true);
    setSelectedVideoId(id);
  };

  const handleConfirmDelete = async () => {
    if (!selectedVideoId) return;

    try {
      const formData = new FormData();
      formData.append("id", selectedVideoId);

      const response = await fetch("/api/youtube-video/youtube-vid-delete", {
        method: "DELETE",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Video deleted successfully!");
        fetchVideos();
      } else {
        toast.error(result.error || "Failed to delete video.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error("Network error, please try again later.");
    } finally {
      setDeletePopup(false);
      setSelectedVideoId(null);
      setConfirmationName("");
    }
  };

  const handleEditClick = (id: string) => {
    setEditingVideoId(id);
    setShowEditForm(true);
  };

  const handleEditSuccess = () => {
    fetchVideos();
    setShowEditForm(false);
    setEditingVideoId(null);
  };

  return (
    <div className="w-full p-4 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Uploaded Videos</h1>
      {loading && <p>Loading videos...</p>}
      {!loading && videos.length === 0 && <p>No videos available.</p>}
      <ul className="w-full space-y-2">
        {videos.map((item) => (
          <li
            key={item._id}
            className="w-full flex flex-col items-center justify-center bg-white px-4 py-2 rounded shadow"
          >
            <div className="w-full flex flex-row justify-between items-center">
              <span>{item.title}</span>
              <div>
                <Link
                  className="text-blue-500 font-sans hover:underline mr-2"
                  href={item.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </Link>
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
            {showEditForm && editingVideoId && editingVideoId === item._id && (
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
            <p className="mb-2">Enter the video title to confirm deletion:</p>
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

export default VideoDisplay;
