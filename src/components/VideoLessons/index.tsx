"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Arrow icons
import VideoPlayer from "./VideoPlayer"; // Importing the VideoPlayer component

// Slick Carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchYouTubeVideos } from "@/hooks/DisplayAllVideos";
import AboutHeading from "../AboutHeading";
import LoadingSpinner from "../LoadingSpinner";

// TypeScript interface for video
interface YouTubeVideo {
  _id: string;
  title: string;
  videoLink: string;
}

const VideoCarousel: React.FC = () => {
  const { videos, fetchVideos, loading } = useFetchYouTubeVideos();
  const sliderRef = useRef<Slider | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Slick settings for responsive carousel
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: !isPlaying, // Disable autoplay when a video is playing
    autoplaySpeed: 2000, // Set autoplay interval to 2 seconds
    responsive: [
      {
        breakpoint: 1024, // Medium (md) and larger screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Small (sm) screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Update playback state based on video play/pause
  const handleVideoPlay = () => {
    setIsPlaying(true);
    console.log("video is playing");
    sliderRef.current?.slickPause(); // Pause the carousel
  };

  const handleVideoStop = () => {
    setIsPlaying(false);
    console.log("video is stopped");
    sliderRef.current?.slickPlay(); // Resume the carousel
  };

  // Arrow button handlers
  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div className="w-full py-12 flex flex-col justify-center items-center gap-[2rem] overflow-hidden">
      {/* Show loading state */}
      <AboutHeading text="Video Lessons" />
      {loading &&  <LoadingSpinner text="Loading Videos"/>}

      {/* Video Carousel */}
      {!loading && videos.length > 0 && (
        <div className="relative w-full">
          <Slider {...settings} ref={sliderRef}>
            {videos.map((video: YouTubeVideo) => (
              <div key={video._id} className="px-2">
                <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                  <div className="w-full h-fit">
                    <VideoPlayer
                      videoUrl={video.videoLink}
                      onPlay={handleVideoPlay}
                      onStop={handleVideoStop}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold">{video.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-0 w-full flex items-center justify-between transform -translate-y-1/2 px-4">
            <button
              onClick={handlePrev}
              className="border-[1px] border-black bg-white text-black p-2 rounded-full shadow-md"
            >
              <FaArrowLeft className="text-2xl" />
            </button>
            <button
              onClick={handleNext}
              className="border-[1px] border-black bg-white text-black p-2 rounded-full shadow-md"
            >
              <FaArrowRight className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCarousel;
