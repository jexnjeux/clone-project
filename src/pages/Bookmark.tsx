import { useState } from 'react';
import { PhotoItem } from '../types/photos';
import { calculatePagination } from '../utils/paginationUtils';
import { PHOTOS_PER_PAGE } from '../constants/pagination';
import { fetchPhotoDetails } from '../apis/main/photoDetails';
import { useBookmarkStore } from '../stores/bookmark';
import { useLoadingStore } from '../stores/loading';
import useModal from '../hooks/useModal';
import usePageChage from '../hooks/usePageChange';
import PhotoDetails from '../components/shared/PhotoDetails';
import Modal from '../components/shared/Modal';
import RenderContent from '../components/bookmark/RenderContent';
import RenderPhotoSkeleton from '../components/main/RenderPhotoSkeleton';
function BookmarkPage() {
  const { openModal, closeModal, isOpen } = useModal();
  const { currentPage, changePage } = usePageChage();
  const isLoading = useLoadingStore((state) => state.requestCount > 0);

  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const bookmarks = useBookmarkStore((state) => state.bookmarks);

  const handlePhotoClick = async (id: string) => {
    try {
      const data = await fetchPhotoDetails(id);
      setSelectedPhoto(data ?? null);
      openModal();
    } catch (e) {
      setSelectedPhoto(null);
      throw new Error('이미지 정보를 가져오는데 실패했습니다.');
    }
  };

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'string' || page < 0) {
      return;
    }
    changePage(page);
    scrollTo(0, 0);
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    const newPage = calculatePagination(direction, currentPage, totalPages);
    changePage(newPage);
  };
  const bookmarkedPhoto = Object.values(bookmarks).filter(Boolean);
  const totalPages = Math.ceil(bookmarkedPhoto.length / PHOTOS_PER_PAGE);
  const startIndex = (currentPage - 1) * PHOTOS_PER_PAGE;
  const endIndex = startIndex + PHOTOS_PER_PAGE;
  const currentBookmarkedPhoto = bookmarkedPhoto.slice(startIndex, endIndex);

  return (
    <>
      {isOpen && selectedPhoto ? (
        <Modal
          closeModal={closeModal}
          isOpen={isOpen}
          content={<PhotoDetails photo={selectedPhoto} />}
        />
      ) : null}

      {isLoading ? (
        <RenderPhotoSkeleton />
      ) : (
        <RenderContent
          currentBookmarkedPhoto={currentBookmarkedPhoto}
          bookmarkedPhoto={bookmarkedPhoto}
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={handlePageChange}
          onClickArrow={handleArrowClick}
          onClickPhoto={handlePhotoClick}
        />
      )}
    </>
  );
}

export default BookmarkPage;
