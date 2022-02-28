import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user');
        isMounted.current && setUser(response.data);
      } catch (error: any) {
        console.log(error);
        isMounted.current && setError(error.message);
      }

      return setLoading(false);
    };

    fetchUser();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return { user, loading, error };
}
