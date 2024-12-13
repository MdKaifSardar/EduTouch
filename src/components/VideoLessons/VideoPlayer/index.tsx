"use client";
import Image from "next/image";
import { useState } from "react";

interface YouTubePlayerProps {
  videoUrl: string;
  onPlay: () => void;
  onStop: () => void;
}

const VideoPlayer: React.FC<YouTubePlayerProps> = ({
  videoUrl,
  onPlay,
  onStop,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
  };

  const handlePlay = () => {
    setIsPlaying(true);
    onPlay(); // Notify parent to pause carousel
  };

  const handleStop = () => {
    setIsPlaying(false);
    onStop(); // Notify parent to resume carousel
  };

  const togglePlay = () => {
    if (isPlaying) {
      handleStop();
    } else {
      handlePlay();
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-video bg-gray-200 rounded-lg shadow-lg overflow-hidden">
      {isPlaying ? (
        <iframe
          src={getYouTubeEmbedUrl(videoUrl)}
          title="YouTube Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          onClick={togglePlay}
        />
      ) : (
        <div
          className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/50"
          onClick={togglePlay}
        >
          <Image
            src={`https://img.youtube.com/vi/${new URL(
              videoUrl
            ).searchParams.get("v")}/0.jpg`}
            width={300}
            height={200}
            alt="YouTube Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              className="w-8 h-8"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
