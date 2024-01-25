import instance from '..';
import { Image, SearchAxiosResponse, SearchResponse } from '../../types/search';

export const fetchImages = async (
  query: string,
  page: number,
): Promise<SearchResponse | undefined> => {
  try {
    const params = {
      query,
      page,
      per_page: 20,
      client_id: import.meta.env.VITE_ACCESS_KEY,
    };
    const { data } = await instance.get<SearchAxiosResponse>('/search/photos', {
      params,
    });

    const images = data.results.map((item: Image) => ({
      id: item.id,
      alt_description: item.alt_description,
      created_at: item.created_at,
      liked_by_user: item.liked_by_user,
      urls: item.urls,
      links: item.links,
      tags: item.tags.map((tag) => tag.title),
      width: item.width,
      height: item.height,
      user: item.user,
      likes: item.likes,
    }));

    return {
      results: images,
      total: data.total,
      total_pages: data.total_pages,
    };
  } catch (e) {
    console.error(e);
  }
};
