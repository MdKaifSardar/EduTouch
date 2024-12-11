import { dashboardsFields } from "@/utility/AdminDashboard";
import Link from "next/link";
import React from "react";

const EditOptionsComp = () => {
  return (
    <div className="my-[1rem] md:my-[3rem] w-[60%] h-fit gap-x-[1rem] md:gap-x-[3rem] gap-y-[1rem] grid-cols-1 grid md:grid-cols-2 gris-rows-auto">
      {dashboardsFields.map((field, index) => (
        <Link
          key={index}
          href={field.url}
          className="w-full h-full text-white bg-[#182C6F] rounded-lg px-5 py-3 text-center"
        >
          {field.title}
        </Link>
      ))}
    </div>
  );
};

export default EditOptionsComp;
