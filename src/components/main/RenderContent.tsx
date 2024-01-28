import { PhotoItem } from '../../types/photos';
import RenderPhotos from './RenderPhotos';
import EmptyPhotoMessage from '../shared/EmptyPhotoMessage';
import RenderPagination from './RenderPagination';
import Photos from '../shared/Photos';
import FallbackImages from '../shared/FallbackImages';

interface ContentProps {
  apiError: boolean;
  currentPage: number;
  totalPages: number;
  photos: PhotoItem[];
  onClickPhoto: (id: string) => Promise<void>;
  onChangePage: (page: number | string) => void;
  onClickArrow: (direction: 'left' | 'right') => void;
}

function RenderContent({
  apiError,
  currentPage,
  totalPages,
  photos,
  onClickPhoto,
  onChangePage,
  onClickArrow,
}: ContentProps) {
  const hasPhotos = photos.length > 0;

  return (
    <>
      {!apiError && !hasPhotos && <EmptyPhotoMessage page="main" />}
      <Photos totalImages={photos.length}>
        {hasPhotos && (
          <RenderPhotos
            apiError={apiError}
            photos={photos}
            onClickPhoto={onClickPhoto}
          />
        )}
        {apiError && <FallbackImages />}
      </Photos>
      {hasPhotos && totalPages > 0 && (
        <RenderPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={onChangePage}
          onClickArrow={onClickArrow}
        />
      )}
    </>
  );
}
export default RenderContent;
