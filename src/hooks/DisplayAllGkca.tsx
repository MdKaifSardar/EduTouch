import { useState, useCallback } from "react";
import { toast } from "react-toastify";

interface GKCA {
  _id: string;
  title: string;
  gkPDF: string; // URL for the General Knowledge PDF
  currentAffairsPDF: string; // URL for the Current Affairs PDF
  caImage: string;
  gkImage: string;
}

export const useFetchGKCA = () => {
  const [gkcaAllList, setAllGkcaList] = useState<GKCA[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGKCA = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/gkca/gkca-display");
      const { gkcaList } = await response.json();
      setAllGkcaList(gkcaList);
    } catch (error) {
      console.error("Failed to fetch GKCA:", error);
      toast.error("Failed to fetch General Knowledge/Current Affairs.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { gkcaAllList, fetchGKCA, loading };
};
