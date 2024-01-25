import { useState } from 'react';
import { fetchImages } from '../apis/main/search';
import { ImageItem } from '../types/image';

const useSearch = () => {
  const [searchTerms, setSearchTerms] = useState('');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerms(value);
  };

  const updateImageState = async () => {
    try {
      const data = await fetchImages(searchTerms, currentPage);
      setImages(data?.results ?? []);
      setTotalPages(data?.total_pages ?? 0);
    } catch (e) {
      console.error(e);
    }
  };

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
    void updateImageState();
  };

  return {
    searchTerms,
    handleSearchTermsChange,
    updateImageState,
    changePage,
    images,
    totalPages,
  };
};

export default useSearch;
