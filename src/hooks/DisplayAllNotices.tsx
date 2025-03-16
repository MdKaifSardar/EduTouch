import { useState, useCallback } from "react";
import { toast } from "react-toastify";

interface Notice {
  _id: string;
  noticeTitle: string;
  pdf: string; // URL or path of the PDF
}

export const useFetchNotices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNotices = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/notice/notice-display");
      const { notices } = await response.json();
      setNotices(notices);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
      toast.error("Failed to fetch notices.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { notices, fetchNotices, loading };
};
