import instance from '..';
import { PHOTOS_PER_PAGE } from '../../constants/pagination';
import { Photo, RandomResponse } from '../../types/photos';

export const fetchRandomPhotos = async (): Promise<
  RandomResponse | undefined
> => {
  try {
    const params = {
      client_id: import.meta.env.VITE_ACCESS_KEY,
      count: PHOTOS_PER_PAGE,
    };
    const { data }: { data: Photo[] } = await instance.get('/photos/random', {
      params,
    });
    const photos = data.map((item: Photo) => ({
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
    return { results: photos };
  } catch (e) {
    console.error(e);
  }
};
