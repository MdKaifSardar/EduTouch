import { useState, useCallback } from "react";
import { toast } from "react-toastify";

// Define the GKCA interface based on the IGKCurrAff model
interface GKCA {
  _id: string; // Document ID
  title: string; // Title
  gkImage: string; // URL for the GK image
  caImage: string; // URL for the Current Affairs image
  gkTitle: string; // Title for GK
  caTitle: string; // Title for Current Affairs
  gkLink: string; // URL for the GK PDF or link
  caLink: string; // URL for the Current Affairs PDF or link
}

// Hook to fetch GKCA data
export const useFetchGKCA = () => {
  const [gkcaAllList, setAllGkcaList] = useState<GKCA[]>([]); // State to store the fetched list
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading status

  // Function to fetch GKCA data
  const fetchGKCA = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/gkca/gkca-display");

      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse and type the response data
      const { gkcaList }: { gkcaList: GKCA[] } = await response.json();
      setAllGkcaList(gkcaList); // Update state with the fetched data
    } catch (error) {
      console.error("Failed to fetch GKCA:", error);
      toast.error("Failed to fetch General Knowledge/Current Affairs.");
    } finally {
      setLoading(false); // Reset loading state
    }
  }, []);

  // Return the state and function for use in components
  return { gkcaAllList, fetchGKCA, loading };
};
