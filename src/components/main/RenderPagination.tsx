import Pagination from '../shared/Pagination';
import Spacing from '../shared/Spacing';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onChangePage: (page: number | string) => void;
  onClickArrow: (direction: 'left' | 'right') => void;
}

function RenderPagination({
  totalPages,
  currentPage,
  onChangePage,
  onClickArrow,
}: PaginationProps) {
  return (
    <>
      <Spacing direction="vertical" size={24} />
      <Pagination
        currentPage={currentPage}
        totalPage={totalPages}
        onChangePage={onChangePage}
        onClickArrow={onClickArrow}
      />
    </>
  );
}

export default RenderPagination;
