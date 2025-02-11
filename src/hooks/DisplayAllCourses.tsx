import { useState, useCallback } from "react";
import { toast } from "react-toastify";

interface Course {
  _id: string;
  courseName: string;
  courseHighlights: string;
  courseSyllabus: string;
  courseDescription: string;
  courseDuration: string;
  image: string; // Assuming the backend sends a URL or base64 string
  // pdf: string; // Assuming PDF is sent as a base64 string or URL
}

export const useFetchCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/course/course-display");
      const { courses } = await response.json();
      setCourses(courses);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      toast.error("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { courses, fetchCourses, loading };
};
