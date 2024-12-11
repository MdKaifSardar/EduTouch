"use client"

import { useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import { useFetchYouTubeVideos } from "@/hooks/DisplayAllVideos";

const VideoLessons = () => {
  const { videos, fetchVideos, loading } = useFetchYouTubeVideos();

  // Fetch videos when the component mounts
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <div className="flex gap-[1rem] flex-col justify-center items-center w-full">
      <div className="text-5xl text-center w-full mb-[2rem]">Video Lessons</div>

      {loading && (
        <div className="text-xl text-blue-500">Loading Videos...</div>
      )}

      {!loading && (
        <div className="grid grid-cols-2 grid-rows-auto gap-3 w-full">
          {videos.map((video, index) => (
            <div
              key={index}
              className="gap-[1rem] flex flex-col justify-center items-center"
            >
              <VideoPlayer videoUrl={video.videoLink} />
              <span className="text-xl font-sans font-semibold">
                {video.title}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-[2rem] md:text-2xl text-xl bg-transparent text-blue-400">
        <a href="/courses">View more videos on YouTube</a>
      </div>
    </div>
  );
};

export default VideoLessons;
