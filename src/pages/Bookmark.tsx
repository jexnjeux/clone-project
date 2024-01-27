import { useState } from 'react';
import styled from 'styled-components';
import { PhotoItem } from '../types/photos';
import { calculatePagination } from '../utils/paginationUtils';
import { PHOTOS_PER_PAGE } from '../constants/pagination';
import { fetchPhotoDetails } from '../apis/main/photoDetails';
import { useBookmarkStore } from '../stores/bookmark';
import { useLoadingStore } from '../stores/loading';
import useModal from '../hooks/useModal';
import PhotoDetails from '../components/main/PhotoDetails';
import Photos from '../components/main/Photos';
import Modal from '../components/shared/Modal';
import Photo from '../components/shared/Photo';
import Spacing from '../components/shared/Spacing';
import Pagination from '../components/shared/Pagination';
import Loading from '../components/shared/Loading';

function BookmarkPage() {
  const { openModal, closeModal, isOpen } = useModal();
  const isLoading = useLoadingStore((state) => state.requestCount > 0);

  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const bookmarks = useBookmarkStore((state) => state.bookmarks);

  const handleClickPhoto = async (id: string) => {
    try {
      const data = await fetchPhotoDetails(id);
      setSelectedPhoto(data ?? null);
      openModal();
    } catch (e) {
      console.error(e);
      setSelectedPhoto(null);
    }
  };

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'string' || page < 0) {
      return;
    }
    setCurrentPage(page);
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    const newPage = calculatePagination(direction, currentPage, totalPages);
    setCurrentPage(newPage);
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

      {isLoading ? <Loading /> : null}
      <Container>
        <Photos $totalImages={bookmarkedPhoto.length}>
          {currentBookmarkedPhoto.length > 0 &&
            currentBookmarkedPhoto.map((photo) => {
              if (!photo) {
                return;
              }
              return (
                <Photo
                  key={photo.id}
                  photo={photo}
                  url={photo.urls.thumb}
                  alt={photo.alt_description ?? photo.id}
                  onClick={() => void handleClickPhoto(photo.id)}
                />
              );
            })}
        </Photos>
        <Spacing direction="vertical" size={24} />
        {bookmarkedPhoto.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onChangePage={handlePageChange}
            onClickArrow={handleArrowClick}
          />
        )}
      </Container>
    </>
  );
}

export default BookmarkPage;

const Container = styled.div`
  padding-bottom: 24px;
`;
