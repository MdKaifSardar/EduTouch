import EditOptionsComp from "@/components/EditOptionsComp";
import { FooterLogo } from "@/utility/Navbar";
import Image from "next/image";

const page = () => {
  return (
    <div className="mb-[3rem] md:mb-[3rem] mt-[5rem] w-full h-fit flex flex-col justify-center items-center gap-[1rem]">
      <Image
        src={FooterLogo}
        alt="nav logo"
        width={300}
        height={200}
        className="w-[70%] md:w-[60%] lg:w-[30%] h-auto object-contain"
      />
      <EditOptionsComp />
    </div>
  );
};

export default page;
