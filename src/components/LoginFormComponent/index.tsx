"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginFormComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data?.token) {
        document.cookie = `token=${data.token}; path=/; SameSite=Strict; Secure;`;
        toast.success("Login successful!");
        router.push("/admin-dashboard");
      } else {
        setError(data?.message || "Something went wrong");
        toast.error(data?.message || "Unable to log in");
      }
    } catch {
      setError("Unable to connect to server");
      toast.error("Unable to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:w-[30%] flex flex-col justify-center items-center bg-transparent">
      {error && (
        <p className="text-red-500 text-lg font-semibold text-center mb-2">
          {error}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center items-center space-y-4"
      >
        <div className="w-full flex flex-col justify-center items-start">
          <label className="block text-sm font-medium text-white">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 px-3 py-2 border border-white rounded-lg w-full bg-transparent text-white placeholder-white"
            placeholder="Enter your email"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start">
          <label className="block text-sm font-medium text-white">
            Password
          </label>
          <div className="relative w-full">
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 px-3 py-2 border border-white rounded-lg w-full bg-transparent text-white placeholder-white"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-fit px-[2rem] py-[.6rem] ${
            isLoading ? "bg-gray-500" : "bg-blue-800 hover:bg-blue-700"
          } text-white rounded-md transition duration-200`}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginFormComponent;
