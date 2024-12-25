import React from "react";

const AboutHeading = ({ text }: { text: string }) => {
  return (
    <div className="text-4xl sm:text-5xl text-center w-fit pb-[.5rem] border-b-[3px] border-yellow-600">
      {text}
    </div>
  );
};

export default AboutHeading;
