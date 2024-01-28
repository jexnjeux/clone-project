import { useEffect, useRef, useState } from 'react';
import { PhotoItem } from '../types/photos';
import { calculatePagination } from '../utils/paginationUtils';
import { FIRST_PAGE } from '../constants/pagination';
import { fetchPhotoDetails } from '../apis/main/photoDetails';
import usePhotos from '../hooks/usePhotos';
import useModal from '../hooks/useModal';
import usePageChage from '../hooks/usePageChange';
import { useLoadingStore } from '../stores/loading';
import RenderSearch from '../components/main/RenderSearch';
import PhotoDetails from '../components/shared/PhotoDetails';
import Modal from '../components/shared/Modal';
import RenderContent from '../components/main/RenderContent';
import RenderPhotoSkeleton from '../components/main/RenderPhotoSkeleton';

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
      <RenderSearch
        onChangeSearchTerms={handleSearchTermsChange}
        onSearch={handleSearch}
      />
      {isLoading ? (
        <RenderPhotoSkeleton />
      ) : (
        <>
          <RenderContent
            apiError={apiError}
            currentPage={currentPage}
            totalPages={totalPages}
            photos={photos}
            onClickPhoto={handlePhotoClick}
            onChangePage={handlePageChange}
            onClickArrow={handleArrowClick}
          />
        </>
      )}
    </>
  );
}

export default MainPage;
