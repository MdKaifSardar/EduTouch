import { useState, useCallback } from "react";
import { toast } from "react-toastify";

interface Teacher {
  _id: string;
  teacherName: string;
  subject: string;
  image: string; // Use a string to handle base64 or URL for images
}

export const useFetchTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/teacher/teacher-display");
      const { teachers } = await response.json();
      setTeachers(teachers);
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch teachers:", error);
      toast.error("Failed to fetch teachers.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { teachers, fetchTeachers, loading };
};
