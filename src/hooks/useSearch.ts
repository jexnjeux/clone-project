import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchImages } from '../apis/main/search';
import { ImageItem } from '../types/image';
import { fetchRandomPhotos } from '../apis/main/randomPhotos';

const useSearch = () => {
  const isInitialMount = useRef(true);
  const [searchTerms, setSearchTerms] = useState('');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearchTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerms(value);
  };

  const loadImages = useCallback(
    async (page: number) => {
      try {
        const data = await fetchImages(searchTerms, page);
        setImages(data?.results ?? []);
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
      setImages(data?.results ?? []);
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
    loadImages,
    images,
    totalPages,
  };
};

export default useSearch;
