import { loadingSpinner } from "@/utility/LoadingSpinner";
import Image from "next/image";

const LoadingSpinner = ({ text }: { text: string }) => {
  return (
    <div className="w-fit h-fit flex flex-row justify-center items-center gap-[.5rem] ">
      <Image
        src={loadingSpinner}
        alt="loading"
        width={300}
        height={300}
        className="w-[2rem] object-cover h-auto"
      />
      <span className="text-md sm:text-xl font-semibold">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
