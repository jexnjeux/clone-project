import axios, { AxiosError, AxiosResponse } from 'axios';
import { useLoadingStore } from '../stores/loading';

const accessKey: string = import.meta.env.VITE_ACCESS_KEY;

if (!accessKey) {
  throw new Error('VITE_ACCESS_KEY 가 필요합니다.');
}

const instance = axios.create({
  baseURL: 'https://api.unsplash.com',
  params: { client_id: accessKey },
});

instance.interceptors.request.use((config) => {
  useLoadingStore.getState().setLoading(true);
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    useLoadingStore.getState().setLoading(false);
    return response;
  },
  (error: AxiosError) => {
    useLoadingStore.getState().setLoading(false);
    return Promise.reject(error);
  },
);

export default instance;
