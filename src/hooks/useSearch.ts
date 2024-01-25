import { useState } from 'react';
import { fetchImages } from '../apis/main/search';
import { ImageItem } from '../types/image';

const useSearch = () => {
  const [searchTerms, setSearchTerms] = useState('');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearchTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerms(value);
  };

  const loadImages = async (page: number) => {
    try {
      const data = await fetchImages(searchTerms, page);
      setImages(data?.results ?? []);
      setTotalPages(data?.total_pages ?? 0);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    searchTerms,
    handleSearchTermsChange,
    loadImages,
    images,
    totalPages,
  };
};

export default useSearch;
