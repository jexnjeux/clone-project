import instance from '..';
import { PHOTOS_PER_PAGE } from '../../constants/pagination';
import { Photo, SearchAxiosResponse, SearchResponse } from '../../types/photos';

export const fetchPhotos = async (
  query: string,
  page: number,
): Promise<SearchResponse | undefined> => {
  try {
    const params = {
      query,
      page,
      per_page: PHOTOS_PER_PAGE,
      client_id: import.meta.env.VITE_ACCESS_KEY,
      lang: 'ko',
    };
    const { data } = await instance.get<SearchAxiosResponse>('/search/photos', {
      params,
    });

    const photos = data.results.map((item: Photo) => ({
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
      downloads: 0,
    }));

    return {
      results: photos,
      total: data.total,
      total_pages: data.total_pages,
    };
  } catch (e) {
    throw new Error('이미지를 가져오는데 실패했습니다.');
  }
};
