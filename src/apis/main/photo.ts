import instance from '..';
import { PhotoAxiosResponse, PhotoResponse } from '../../types/image';

export const fetchImageDetails = async (
  id: string,
): Promise<PhotoResponse | undefined> => {
  try {
    const params = {
      client_id: import.meta.env.VITE_ACCESS_KEY,
    };
    const { data } = await instance.get<PhotoAxiosResponse>(`/photos/${id}`, {
      params,
    });

    return {
      id: data.id,
      alt_description: data.alt_description || '',
      created_at: data.created_at,
      downloads: data.downloads,
      width: data.width,
      height: data.height,
      liked_by_user: data.liked_by_user,
      links: data.links,
      urls: data.urls,
      tags: data.tags_preview.map((tag) => tag.title),
      user: data.user,
    };
  } catch (e) {
    console.error(e);
  }
};
