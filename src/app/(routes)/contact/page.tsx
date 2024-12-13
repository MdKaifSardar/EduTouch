import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import RegistrationForm from "@/components/RegistrationForm";
import React from "react";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <div className="gap-[2rem] w-[90%] md:w-[85%] h-fit flex flex-col justify-center items-center">
      <ToastContainer />
      <ContactInfo />
      <RegistrationForm />
      <ContactForm />
    </div>
  );
};

export default page;
