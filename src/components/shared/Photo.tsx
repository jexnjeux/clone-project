import styled from 'styled-components';
import { PhotoItem } from '../../types/photos';
import useToggleBookmark from '../../hooks/useToggleBookmark';
import StyledHeartLineIcon from '../../assets/icons/StyledHeartLineIcon';
import StyledHeartFillIcon from '../../assets/icons/StyledHeartFillIcon';

interface PhotoProps {
  photo: PhotoItem;
  url: string;
  alt: string;
  onClick: () => void;
  isSkeleton?: boolean;
}

function Photo({ photo, url, alt, onClick, isSkeleton = false }: PhotoProps) {
  const { handleToggleBookmark, getBookmarkStatus } = useToggleBookmark();

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleToggleBookmark(photo);
  };

  return (
    <Container onClick={onClick} $isSkeleton={isSkeleton}>
      <Thumbnail src={url} alt={alt} />
      {!isSkeleton && (
        <IconContainer onClick={(e) => handleBookmarkClick(e)}>
          {getBookmarkStatus(photo.id) ? (
            <StyledHeartFillIcon colorname="red" />
          ) : (
            <StyledHeartLineIcon colorname="white" />
          )}
        </IconContainer>
      )}
    </Container>
  );
}

export default Photo;

const Container = styled.div<{ $isSkeleton: boolean }>`
  width: 200px;
  height: 200px;
  position: relative;
  cursor: ${({ $isSkeleton }) => ($isSkeleton ? 'initial' : 'pointer')};
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IconContainer = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 4px;
  right: 4px;
`;
