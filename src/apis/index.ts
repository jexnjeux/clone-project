import axios from 'axios';

const accessKey: string = import.meta.env.VITE_ACCESS_KEY;

if (!accessKey) {
  throw new Error('VITE_ACCESS_KEY 가 필요합니다.');
}

const instance = axios.create({
  baseURL: 'https://api.unsplash.com/',
  params: { client_id: accessKey },
});

export default instance;
