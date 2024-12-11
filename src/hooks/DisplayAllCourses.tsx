import { useState, useCallback } from "react";
import { toast } from "react-toastify";

interface Course {
  _id: string;
  courseName: string;
  courseHighlights: string;
  courseSyllabus: string;
  courseDescription: string;
  courseDuration: string;
  image: string; // Store the image as a binary buffer
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
      setLoading(false);
      console.error("Failed to fetch courses:", error);
      toast.error("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { courses, fetchCourses, loading };
};
