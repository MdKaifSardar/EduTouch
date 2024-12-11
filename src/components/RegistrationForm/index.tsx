"use client";
import { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    qualification: "",
    course: "",
  });

  const courses = [
    "Web Development",
    "Data Science",
    "Cybersecurity",
    "UI/UX Design",
    "Machine Learning",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-[50%] mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Registration Form</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 bg-[#d9d9d9] border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-2 bg-[#d9d9d9] border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-2 bg-[#d9d9d9] border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 bg-[#d9d9d9] border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Highest Qualification
          </label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            placeholder="Highest Qualification"
            className="w-full p-2 bg-[#d9d9d9] border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Select Course
          </label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full p-2 bg-[#d9d9d9] border rounded-md"
          >
            <option value="" disabled>
              Select Course
            </option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-bold rounded-md"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
