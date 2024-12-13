import { useState, useCallback } from "react";
import { toast } from "react-toastify";

// Define the interface for a gallery item
interface GalleryItem {
  _id: string;
  title: string;
  imageNew: string; // Assuming the image will be converted to a Base64 string or URL
}

export const useFetchGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGalleryItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/gallery/gallery-display"); // Adjust the endpoint if needed
      if (!response.ok) {
        throw new Error("Failed to fetch gallery items");
      }
      const { galleryItems } = await response.json();
      setGalleryItems(galleryItems);
    } catch (error) {
      console.error("Failed to fetch gallery items:", error);
      toast.error("Failed to fetch gallery items.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { galleryItems, fetchGalleryItems, loading };
};
