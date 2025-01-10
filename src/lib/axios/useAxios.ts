'use client';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import axios from '@/lib/axios';

const useAxios = (url: string, params?: AxiosRequestConfig) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Memoize fetchData to prevent recreation on every render
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response: AxiosResponse = await axios(url, params);
      setData(response?.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [params, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData, params, url]);

  return { data, error, loading, refetch: fetchData };
};

export default useAxios;
