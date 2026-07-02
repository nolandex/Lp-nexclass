import { useState, useEffect } from 'react';

export const useAccess = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHasAccess(true); // Mock access rights
      setLoading(false);
    }, 500);
  }, []);

  return { hasAccess, loading };
};