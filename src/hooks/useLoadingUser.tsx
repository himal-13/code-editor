// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';

export const useLoadingUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Update loading state after auth check
    });

    return unsubscribe; // Cleanup observer on unmount
  }, []);

  return { user, loading };
};
