import instance from '..';
import { IMAGES_PER_PAGE } from '../../constants/pagination';
import { Image, RandomResponse } from '../../types/image';

export const fetchRandomPhotos = async (): Promise<
  RandomResponse | undefined
> => {
  try {
    const params = {
      client_id: import.meta.env.VITE_ACCESS_KEY,
      count: IMAGES_PER_PAGE,
    };
    const { data }: { data: Image[] } = await instance.get('/photos/random', {
      params,
    });
    const images = data.map((item: Image) => ({
      id: item.id,
      alt_description: item.alt_description,
      created_at: item.created_at,
      liked_by_user: item.liked_by_user,
      urls: item.urls,
      links: item.links,
      tags: [],
      width: item.width,
      height: item.height,
      user: item.user,
      downloads: 0,
    }));
    return { results: images };
  } catch (e) {
    console.error(e);
  }
};
