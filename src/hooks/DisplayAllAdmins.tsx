import { useState, useCallback } from "react";
import { toast } from "react-toastify";

interface Admin {
  _id: string;
  email: string;
  username?: string;
}

export const useFetchAdmins = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/admin-display");
      const { admins } = await response.json();
      setAdmins(admins);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
      toast.error("Failed to fetch admins.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { admins, fetchAdmins, loading };
};
