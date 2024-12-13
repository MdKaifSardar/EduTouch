"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IUser {
  _id: string;
  email: string;
  username?: string;
}

interface EditFormProps {
  item: IUser;
  onSuccess: () => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ item, onSuccess, onClose }) => {
  const [email, setEmail] = useState(item.email);
  const [username, setUsername] = useState(item.username || "");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    setEmail(item.email);
    setUsername(item.username || "");
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Check if the fields have changed before appending them
    if (email !== item.email) formData.append("email", email);
    if (username !== item.username) formData.append("username", username);
    if (password !== "") formData.append("password", password);
    if (item._id) formData.append("id", item._id);

    try {
      setLoading(true);
      const response = await fetch(`/api/auth/admin-edit`, {
        method: "PATCH",
        body: formData,
      });

      const result = await response.json();
      setLoading(false);
      if (response.ok) {
        toast.success("User updated successfully.");
        onSuccess();
        onClose();
      } else {
        toast.error(result?.error || "Failed to update user.");
      }
    } catch (error) {
      console.error("Error during update:", error);
      toast.error("Network error, please try again later.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto bg-white shadow-md p-6 rounded-lg space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"} // Toggle between text and password types
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {isPasswordVisible ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Editing..." : "Edit Changes"}
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
