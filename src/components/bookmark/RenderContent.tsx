import styled from 'styled-components';
import { spacing } from '../../styles/theme';
import EmptyPhotoMessage from '../shared/EmptyPhotoMessage';
import { PhotoItem } from '../../types/photos';
import RenderPhotos from '../main/RenderPhotos';
import Photos from '../shared/Photos';
import RenderPagination from '../main/RenderPagination';

interface ContentProps {
  currentBookmarkedPhoto: PhotoItem[];
  bookmarkedPhoto: PhotoItem[];
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number | string) => void;
  onClickArrow: (direction: 'left' | 'right') => void;
  onClickPhoto: (id: string) => Promise<void>;
}

function RenderContent({
  currentBookmarkedPhoto,
  bookmarkedPhoto,
  currentPage,
  totalPages,
  onChangePage,
  onClickArrow,
  onClickPhoto,
}: ContentProps) {
  const hasBookmark = currentBookmarkedPhoto.length > 0;
  return (
    <Container>
      {!hasBookmark && <EmptyPhotoMessage page="bookmark" />}
      <Photos totalImages={bookmarkedPhoto.length}>
        {hasBookmark && (
          <RenderPhotos
            apiError={false}
            photos={currentBookmarkedPhoto}
            onClickPhoto={onClickPhoto}
          />
        )}
      </Photos>
      {hasBookmark && (
        <RenderPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={onChangePage}
          onClickArrow={onClickArrow}
        />
      )}
    </Container>
  );
}

export default RenderContent;

const Container = styled.div`
  padding-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl2};
`;
