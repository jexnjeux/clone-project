import styled from 'styled-components';
import { ImageItem } from '../../types/image';
import useToggleBookmark from '../../hooks/useToggleBookmark';
import StyledHeartLineIcon from '../../assets/icons/StyledHeartLineIcon';
import StyledHeartFillIcon from '../../assets/icons/StyledHeartFillIcon';

interface ImageProps {
  image: ImageItem;
  url: string;
  alt: string;
  onClick: () => void;
}

function Image({ image, url, alt, onClick }: ImageProps) {
  const { handleToggleBookmark, getBookmarkStatus } = useToggleBookmark();

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleToggleBookmark(image);
  };

  return (
    <Container onClick={onClick}>
      <Thumbnail src={url} alt={alt} />
      <IconContainer onClick={(e) => handleBookmarkClick(e)}>
        {getBookmarkStatus(image.id) ? (
          <StyledHeartFillIcon colorname="red" />
        ) : (
          <StyledHeartLineIcon colorname="white" />
        )}
      </IconContainer>
    </Container>
  );
}

export default Image;

const Container = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  cursor: pointer;
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
