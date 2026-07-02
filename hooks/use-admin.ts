import { useState, useEffect } from 'react';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate check
    setTimeout(() => {
      setIsAdmin(true); // Mock admin rights
      setLoading(false);
    }, 500);
  }, []);

  return { isAdmin, loading };
};