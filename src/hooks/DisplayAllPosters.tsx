import { useState, useCallback } from "react";
import { toast } from "react-toastify";

// Define the interface for a HeroPoster item
interface HeroPosterItem {
  _id: string;
  title: string;
  image: string; // Assuming the image will be converted to a Base64 string or URL
}

export const useFetchHeroPosters = () => {
  const [heroPosters, setHeroPosters] = useState<HeroPosterItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchHeroPosters = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/heroPoster/heroPoster-display"); // Adjust the endpoint if needed
      if (!response.ok) {
        throw new Error("Failed to fetch hero posters");
      }
      const { heroPosters } = await response.json();
      setHeroPosters(heroPosters);
    } catch (error) {
      console.error("Failed to fetch hero posters:", error);
      toast.error("Failed to fetch hero posters.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { heroPosters, fetchHeroPosters, loading };
};
