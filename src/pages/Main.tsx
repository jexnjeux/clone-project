import { useEffect, useState } from 'react';
import { PhotoItem } from '../types/photos';
import { calculatePagination } from '../utils/paginationUtils';
import { FIRST_PAGE, PHOTOS_PER_PAGE } from '../constants/pagination';
import { fetchPhotoDetails } from '../apis/main/photoDetails';
import usePhotos from '../hooks/usePhotos';
import useModal from '../hooks/useModal';
import { useLoadingStore } from '../stores/loading';
import Search from '../components/main/Search';
import Photos from '../components/main/Photos';
import PhotoDetails from '../components/main/PhotoDetails';
import Photo from '../components/shared/Photo';
import Modal from '../components/shared/Modal';
import Spacing from '../components/shared/Spacing';
import Pagination from '../components/shared/Pagination';
import Loading from '../components/shared/Loading';
import Skeleton from '/images/emptyBox.png';

const skeletonPhotoItem: Partial<PhotoItem> = {
  id: '',
  alt_description: 'skeleton',
};

function MainPage() {
  const { handleSearchTermsChange, loadPhotos, photos, totalPages } =
    usePhotos();
  const { openModal, closeModal, isOpen } = useModal();
  const isLoading = useLoadingStore((state) => state.requestCount > 0);

  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      setSelectedPhoto(null);
    }
  }, [isOpen]);

  const handleClickPhoto = async (id: string) => {
    try {
      const data = await fetchPhotoDetails(id);
      setSelectedPhoto(data ?? null);
      openModal();
    } catch (e) {
      setSelectedPhoto(null);
      throw new Error('이미지 정보를 저장하는데 실패했습니다.');
    }
  };

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'string' || page < 0) {
      return;
    }
    setCurrentPage(page);
    void loadPhotos(page);
    scrollTo(0, 0);
  };

  const handleSearch = async () => {
    setCurrentPage(FIRST_PAGE);
    await loadPhotos(FIRST_PAGE);
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    const newPage = calculatePagination(direction, currentPage, totalPages);

    setCurrentPage(newPage);
    void loadPhotos(newPage);
  };

  const renderEmptyPhotos = () => {
    return Array.from({ length: PHOTOS_PER_PAGE }).map((_, index) => (
      <Photo
        key={`empty-${index}`}
        photo={skeletonPhotoItem as PhotoItem}
        aria-hidden="true"
        url={Skeleton}
        alt="skeleton"
        onClick={() => {}}
        isSkeleton
      />
    ));
  };

  return (
    <>
      {isOpen && selectedPhoto ? (
        <Modal
          closeModal={closeModal}
          isOpen={isOpen}
          content={<PhotoDetails photo={selectedPhoto} />}
        />
      ) : null}
      <div>
        <Search
          onChangeSearchTerms={handleSearchTermsChange}
          onSearch={handleSearch}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Photos totalImages={photos.length}>
              {photos.length > 0
                ? photos.map((photo) => {
                    return (
                      <Photo
                        key={photo.id}
                        photo={photo}
                        alt={photo.alt_description ?? photo.id}
                        url={photo.urls.small}
                        onClick={() => void handleClickPhoto(photo.id)}
                      />
                    );
                  })
                : renderEmptyPhotos()}
            </Photos>
            <Spacing direction="vertical" size={24} />
            {photos.length > 0 && totalPages > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPage={totalPages}
                onChangePage={handlePageChange}
                onClickArrow={handleArrowClick}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default MainPage;
