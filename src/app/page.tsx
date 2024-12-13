import DownloadSec from "@/components/DownloadSec";
import EnrollButtons from "@/components/EnrollButtons";
import KeyOfferingsSec from "@/components/KeyOfferingsSec";
// import MoreTestiButton from "@/components/MoreTestiButton";
import ServicesSec from "@/components/ServicesSec";
import ImageCarousel from "@/components/SlideShow";
import StatsSec from "@/components/StatsSec";
import StudentFeedback from "@/components/StudentFeedback";
import SuccessStories from "@/components/SuccessStories";
import VideoLessons from "@/components/VideoLessons";
import { SlideImages } from "@/utility/SlideShow";

export default function Home() {
  return (
    <div className="flex gap-[2rem] md:gap-[3rem] flex-col justify-center items-center w-full h-fit">
      <ImageCarousel images={SlideImages} />
      <div className="w-[95%] md:w-[85%] h-fit flex flex-col gap-[2rem] md:gap-[3rem] justify-center items-center">
        <DownloadSec />
        <StatsSec />
        <ServicesSec />
        <KeyOfferingsSec />
        <SuccessStories/>
        <StudentFeedback />
        {/* <MoreTestiButton/> */}
        <VideoLessons />
        <EnrollButtons />
      </div>
    </div>
  );
}
