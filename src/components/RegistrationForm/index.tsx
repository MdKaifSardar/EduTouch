"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const validateForm = () => {
    const { name, phone, email, address, qualification, course } = formData;
    if (!name || !phone || !email || !address || !qualification || !course) {
      toast.error("Please fill in all the fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !userID) {
      toast.error(
        "Email configuration missing. Please check your environment variables."
      );
      return;
    }

    emailjs
      .send(serviceID, templateID, formData, userID)
      .then(() => {
        // Removed response variable
        toast.success("Registration successful!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          qualification: "",
          course: "",
        });
      })
      .catch((error) => {
        toast.error("There was an error. Please try again.");
        console.error("Error sending email:", error);
      });
  };

  return (
    <div className="w-full lg:w-[50%] mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
              <option className="w-[50%]" key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full h-fit flex flex-col justify-center items-center">
          <button
            type="submit"
            className="ml-auto mr-auto py-2 px-4 hover:bg-blue-400 w-fit bg-blue-500 text-white font-bold rounded-md"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
