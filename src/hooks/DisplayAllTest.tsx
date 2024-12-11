import { useState, useCallback } from "react";
import { toast } from "react-toastify";

interface Testimonial {
  _id: string;
  studentName: string;
  examName: string;
  testimonial: string;
  rank: string;
  image: string;
}

export const useFetchTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/testimonial/testimonial-display");
      const { testimonials } = await response.json();
      setTestimonials(testimonials);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      toast.error("Failed to fetch testimonials.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { testimonials, fetchTestimonials, loading };
};
