import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

interface Data {
  user: {
    email: string;
    name: string;
    phoneNumber: string;
    cityRegion: string;
    accomodationDetails: string;
    groupSize: number;
    languages: string[];
  };
}

export function useUser() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;

    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/users');
        isMounted.current && setData(response.data);
      } catch (error: any) {
        console.error(error);
        isMounted.current && setError(error.message);
      }

      return setLoading(false);
    };

    fetchUser();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return { data, loading, error };
}
