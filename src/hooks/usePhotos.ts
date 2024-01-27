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
    setSearchTerms(value);
  };

  const loadPhotos = useCallback(
    async (page: number) => {
      try {
        const data = await fetchPhotos(searchTerms, page);
        setPhotos(data?.results ?? []);
        setTotalPages(data?.total_pages ?? 0);
      } catch (e) {
        console.error(e);
      }
    },
    [searchTerms],
  );

  const loadRandomImages = useCallback(async () => {
    try {
      const data = await fetchRandomPhotos();
      setPhotos(data?.results ?? []);
    } catch (e) {
      console.error(e);
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
