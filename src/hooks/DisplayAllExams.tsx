import { useState, useCallback } from "react";
import { toast } from "react-toastify";

interface Exam {
  _id: string;
  examName: string;
  officialSiteLink: string;
  courseSyllabus: string;
  description: string;
  examDate: string;
  image: string; // URL or path of the logo
  qualifications: string;
  selectionProcess: string;
  formFillUpDate: string; // Store as string
}

export const useFetchExams = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchExams = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/exam/exam-display");
      const { exams } = await response.json();
      setExams(exams);
    } catch (error) {
      console.error("Failed to fetch exams:", error);
      toast.error("Failed to fetch exams.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { exams, fetchExams, loading };
};
