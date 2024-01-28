import { useState } from 'react';

const usePageChage = (initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return { currentPage, changePage };
};

export default usePageChage;
