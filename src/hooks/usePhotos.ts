import { useCallback, useEffect, useRef, useState } from 'react';
import { PhotoItem } from '../types/photos';
import { fetchPhotos } from '../apis/main/photo';
import { fetchRandomPhotos } from '../apis/main/randomPhotos';

const usePhotos = () => {
  const isInitialMount = useRef(true);
  const [searchTerms, setSearchTerms] = useState('');
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearchTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      return;
    }
    setSearchTerms(value);
  };

  const loadPhotos = useCallback(
    async (page: number) => {
      try {
        const data = await fetchPhotos(searchTerms, page);
        setPhotos(data?.results ?? []);
        setTotalPages(data?.total_pages ?? 0);
      } catch (e) {
        throw new Error('검색한 이미지 결과를 가져오는데 실패했습니다.');
      }
    },
    [searchTerms],
  );

  const loadRandomImages = useCallback(async () => {
    try {
      const data = await fetchRandomPhotos();
      setPhotos(data?.results ?? []);
    } catch (e) {
      throw new Error('랜덤 이미지를 저장하는데 실패했습니다.');
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      void loadRandomImages();
    }
  }, [loadRandomImages]);

  return {
    searchTerms,
    handleSearchTermsChange,
    loadPhotos,
    photos,
    totalPages,
  };
};

export default usePhotos;
