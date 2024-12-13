import { useState, useCallback } from "react";
import { toast } from "react-toastify";

// Define the interface for a gallery item
interface FeedbackItem {
  _id: string;
  name: string;
  batch: string;
  imageNew: string; // Assuming the image will be converted to a Base64 string or URL
}

export const useFetchFeedback = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFeedbackItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/feedback/feedback-display"); // Adjust the endpoint if needed
      if (!response.ok) {
        throw new Error("Failed to fetch feedback items");
      }
      const { feedbackItems } = await response.json();
      setFeedbackItems(feedbackItems);
    } catch (error) {
      console.error("Failed to fetch feedback items:", error);
      toast.error("Failed to fetch feedback items.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { feedbackItems, fetchFeedbackItems, loading };
};
