import { useState, useCallback } from "react";
import { toast } from "react-toastify";

// Define the interface for a key offering item
interface KeyOffering {
  _id: string;
  title: string;
  image: string; // Image as a URL or Base64 string from the server
}

export const useFetchKeyOfferings = () => {
  const [keyOfferings, setKeyOfferings] = useState<KeyOffering[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchKeyOfferings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/keyoffer/keyoffer-display"); // Adjust the endpoint if needed
      if (!response.ok) {
        throw new Error("Failed to fetch key offerings");
      }
      const { keyOfferings } = await response.json();
      setKeyOfferings(keyOfferings);
    } catch (error) {
      console.error("Failed to fetch key offerings:", error);
      toast.error("Failed to fetch key offerings.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { keyOfferings, fetchKeyOfferings, loading };
};
