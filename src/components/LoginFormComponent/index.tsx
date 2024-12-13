"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginFormComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data?.token) {
        document.cookie = `token=${data.token}; path=/; SameSite=Strict; Secure;`;
        // alert("Login successful!");
        router.push("/admin-dashboard");
      } else {
        setError(data?.message || "Something went wrong");
      }
    } catch {
      setError("Unable to connect to server");
    }
  };

  return (
    <div className="w-full md:w-[30%] flex flex-col justify-center items-center bg-transparent">
      {error && (
        <p className="text-red-500 text-sm text-center mb-2">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center space-y-4">
        <div className="w-full flex flex-col justify-center items-start">
          <label className="block text-sm font-medium text-white">
            Username
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 px-3 py-2 border border-white rounded-lg w-full bg-transparent text-white placeholder-white"
            placeholder="Enter your username"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start">
          <label className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 px-3 py-2 border border-white rounded-lg w-full bg-transparent text-white placeholder-white"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-fit px-[2rem] py-[.6rem] bg-blue-800 hover:bg-blue-700 text-white rounded-md transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginFormComponent;
