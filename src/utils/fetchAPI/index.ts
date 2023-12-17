import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

type UseAxiosResponse<T> = {
  data: T | null;
  error: AxiosError | null;
  loading: boolean;
};

const useAxios = <T>(config: AxiosRequestConfig): UseAxiosResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios(config);
        setData(response.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config]);

  return { data, error, loading };
};

export default useAxios;
