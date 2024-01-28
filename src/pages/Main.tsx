import { useEffect, useRef, useState } from 'react';
import { PhotoItem } from '../types/photos';
import { calculatePagination } from '../utils/paginationUtils';
import { FIRST_PAGE } from '../constants/pagination';
import { fetchPhotoDetails } from '../apis/main/photoDetails';
import usePhotos from '../hooks/usePhotos';
import useModal from '../hooks/useModal';
import usePageChage from '../hooks/usePageChange';
import { useLoadingStore } from '../stores/loading';
import Search from '../components/main/Search';
import Photos from '../components/main/Photos';
import PhotoDetails from '../components/main/PhotoDetails';
import Photo from '../components/shared/Photo';
import Modal from '../components/shared/Modal';
import Spacing from '../components/shared/Spacing';
import Pagination from '../components/shared/Pagination';
import Loading from '../components/shared/Loading';
import FallbackImages from '../components/shared/FallbackImages';
import EmptyPhotoMessage from '../components/shared/EmptyPhotoMessage';

function MainPage() {
  const isInitialMount = useRef(true);

  const {
    handleSearchTermsChange,
    loadPhotos,
    loadRandomPhotos,
    photos,
    totalPages,
  } = usePhotos();
  const { openModal, closeModal, isOpen } = useModal();
  const { currentPage, changePage } = usePageChage();
  const isLoading = useLoadingStore((state) => state.requestCount > 0);

  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedPhoto(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      loadRandomPhotos().catch(() => setApiError(true));
    }
  }, [loadRandomPhotos]);

  const handlePhotoClick = async (id: string) => {
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
    changePage(page);
    void loadPhotos(page);
    scrollTo(0, 0);
  };

  const handleSearch = async () => {
    changePage(FIRST_PAGE);
    await loadPhotos(FIRST_PAGE);
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    const newPage = calculatePagination(direction, currentPage, totalPages);

    changePage(newPage);
    void loadPhotos(newPage);
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
      <Search
        onChangeSearchTerms={handleSearchTermsChange}
        onSearch={handleSearch}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!apiError && photos.length == 0 && <EmptyPhotoMessage page="main" />}
          <Photos totalImages={photos.length}>
            {photos.length > 0 &&
              photos.map((photo) => {
                return (
                  <Photo
                    key={photo.id}
                    photo={photo}
                    alt={photo.alt_description ?? photo.id}
                    url={photo.urls.small}
                    onClick={() => void handlePhotoClick(photo.id)}
                  />
                );
              })}
            {apiError && <FallbackImages />}
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
    </>
  );
}

export default MainPage;
