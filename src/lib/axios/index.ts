import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';

import useAxios from './useAxios';

interface ApiResponse<T> {
  data: T | undefined;
  response: AxiosResponse;
  error: AxiosError | undefined;
}

const apiInstance = axios.create();

apiInstance.interceptors.request.use(async (value) => {
  const session = await getSession();
  const token = session?.user.accessToken;
  if (token) {
    value.headers['Authorization'] = `Bearer ${token}`;
  }
  value.headers['Content-Type'] = value.headers['Content-Type'] || 'application/json';

  return value;
});

export const sendRequest = async <T>(config: AxiosRequestConfig) =>
  apiInstance
    .request<T>(config)
    .then(
      (response): ApiResponse<T> => ({
        response: response,
        data: response.data,
        error: undefined,
      }),
    )
    .catch(
      (err): ApiResponse<T> => ({
        response: err.response,
        data: undefined,
        error: err,
      }),
    );

export const handleThunkApiReponse = <T>(config: {
  error: AxiosError | undefined;
  data: T;
  reject: (error: string) => any;
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
}): T => {
  if (config.error) {
    if (config.onError) {
      config.onError(config.error);
    }

    return config.reject(config.error?.message);
  }

  if (config.onSuccess) {
    config.onSuccess();
  }

  return config.data;
};

export { useAxios };

export default apiInstance;
