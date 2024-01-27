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
    if (error.response?.status === 403) {
      console.error(`[Axios Error]`, error.response);
      alert(
        '제한된 요청 횟수를 모두 사용했습니다. 1시간 뒤 다시 시도해 주세요.',
      );
    } else {
      console.error(`[Axios Error]`, error.response);
      alert('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
    return Promise.reject(error);
  },
);

export default instance;
