import { useState } from 'react';
import { styled } from 'styled-components';
import { fetchImageDetails } from '../apis/main/photo';
import useSearch from '../hooks/useSearch';
import useModal from '../hooks/useModal';
import Search from '../components/main/Search';
import Images from '../components/main/Images';
import Image from '../components/shared/Image';
import ImageDetails from '../components/main/ImageDetails';
import Modal from '../components/shared/Modal';
import Spacing from '../components/shared/Spacing';
import Pagination from '../components/shared/Pagination';
import { FIRST_PAGE } from '../constants/pagination';
import { ImageItem, PhotoResponse } from '../types/image';
import { calculatePagination } from '../utils/paginationUtils';

function MainPage() {
  const { handleSearchTermsChange, loadImages, images, totalPages } =
    useSearch();
  const { openModal, closeModal, isOpen } = useModal();

  const [selectedImage, setSelectedImage] = useState<PhotoResponse | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handleClickImage = async (image: ImageItem) => {
    const id = image.id;
    try {
      const data = await fetchImageDetails(id);
      setSelectedImage(data ?? null);
      openModal();
    } catch (e) {
      console.error(e);
      setSelectedImage(null);
    }
  };

  const handlePageChange = async (page: number | string) => {
    if (typeof page === 'string' || page < 0) {
      return;
    }
    setCurrentPage(page);
    await loadImages(page);
  };

  const handleSearch = async () => {
    setCurrentPage(FIRST_PAGE);
    await loadImages(FIRST_PAGE);
  };

  const handleArrowClick = async (direction: 'left' | 'right') => {
    const newPage = calculatePagination(direction, currentPage, totalPages);

    setCurrentPage(newPage);
    await loadImages(newPage);
  };

  return (
    <>
      {isOpen ? (
        <Modal
          closeModal={closeModal}
          isOpen={isOpen}
          content={<ImageDetails image={selectedImage} />}
        />
      ) : null}
      <Container>
        <Search
          onChangeSearchTerms={handleSearchTermsChange}
          onSearch={handleSearch}
        />
        <Images>
          {images.map((image) => {
            return (
              <Image
                key={image.id}
                alt={image.alt_description ?? image.id}
                url={image.urls.thumb}
                liked={image.liked_by_user}
                onClick={() => void handleClickImage(image)}
              />
            );
          })}
        </Images>
        <Spacing direction="vertical" size={24} />
        {images.length > 0 && (
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

export default MainPage;

const Container = styled.div`
  padding-bottom: 4rem;
`;
