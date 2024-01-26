import {
  FIRST_PAGE,
  ELLIPSIS,
  PAGE_GROUP_LIMIT,
  ADJACENT_PAGES,
  PAGE_GROUP_START_OFFSET,
  SECOND_PAGE,
} from '../constants/pagination';

const usePagination = (totalPage: number, currentPage: number) => {
  const pages: (number | string)[] = [];

  if (totalPage >= FIRST_PAGE) {
    pages.push(FIRST_PAGE);
  }

  if (currentPage > PAGE_GROUP_LIMIT) {
    pages.push(ELLIPSIS);
  }

  const startPage =
    currentPage > PAGE_GROUP_LIMIT
      ? Math.floor((currentPage - PAGE_GROUP_START_OFFSET) / PAGE_GROUP_LIMIT) *
          PAGE_GROUP_LIMIT +
        PAGE_GROUP_START_OFFSET
      : SECOND_PAGE;

  let endPage;
  if (startPage === SECOND_PAGE) {
    endPage = Math.min(totalPage, PAGE_GROUP_LIMIT);
  } else {
    endPage = Math.min(startPage + ADJACENT_PAGES, totalPage);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPage) {
    pages.push(ELLIPSIS);
    pages.push(totalPage);
  }
  return pages;
};

export default usePagination;
