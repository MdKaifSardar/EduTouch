import { useState, useCallback } from "react";
import { toast } from "react-toastify";

interface YouTubeVideo {
  _id: string;
  title: string;
  videoLink: string;
}

export const useFetchYouTubeVideos = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/youtube-video/youtube-vid-display");
      const { videos } = await response.json();
      setVideos(videos);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
      toast.error("Failed to fetch videos.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { videos, fetchVideos, loading };
};
