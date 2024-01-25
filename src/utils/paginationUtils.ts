export const calculatePagination = (
  direction: 'left' | 'right',
  currentPage: number,
  totalPages: number,
) => {
  return direction === 'left'
    ? Math.max(1, currentPage - 1)
    : Math.min(totalPages, currentPage + 1);
};
