import { useState } from 'react';
import ImageDetails from '../components/main/ImageDetails';
import Modal from '../components/shared/Modal';
import useModal from '../hooks/useModal';
import { ImageItem } from '../types/image';
import styled from 'styled-components';
import Images from '../components/main/Images';
import Image from '../components/shared/Image';
import { useBookmarkStore } from '../stores/bookmark';
import { fetchImageDetails } from '../apis/main/photo';
import Spacing from '../components/shared/Spacing';
import Pagination from '../components/shared/Pagination';
import { IMAGES_PER_PAGE } from '../constants/pagination';
import { calculatePagination } from '../utils/paginationUtils';

function BookmarkPage() {
  const { openModal, closeModal, isOpen } = useModal();
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const bookmarks = useBookmarkStore((state) => state.bookmarks);

  const handleClickImage = async (id: string) => {
    try {
      const data = await fetchImageDetails(id);
      setSelectedImage(data ?? null);
      openModal();
    } catch (e) {
      console.error(e);
      setSelectedImage(null);
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
  const bookmarkedImages = Object.values(bookmarks).filter(Boolean);
  const totalPages = Math.ceil(bookmarkedImages.length / IMAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const endIndex = startIndex + IMAGES_PER_PAGE;
  const currentBookmarkedImages = bookmarkedImages.slice(startIndex, endIndex);

  return (
    <>
      {isOpen && selectedImage ? (
        <Modal
          closeModal={closeModal}
          isOpen={isOpen}
          content={<ImageDetails image={selectedImage} />}
        />
      ) : null}

      <Container>
        <Images $totalImages={bookmarkedImages.length}>
          {currentBookmarkedImages.length > 0 &&
            currentBookmarkedImages.map((image) => {
              if (!image) {
                return;
              }
              return (
                <Image
                  key={image.id}
                  image={image}
                  url={image.urls.thumb}
                  alt={image.alt_description ?? image.id}
                  onClick={() => void handleClickImage(image.id)}
                />
              );
            })}
        </Images>
        <Spacing direction="vertical" size={24} />
        {bookmarkedImages.length > 0 && (
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
