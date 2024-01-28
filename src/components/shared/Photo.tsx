import styled from 'styled-components';
import { PhotoItem } from '../../types/photos';
import BookmarkToggle from '../BookmarkToggle';
import { device } from '../../styles/theme';

interface PhotoProps {
  photo: PhotoItem;
  url: string;
  alt: string;
  onClick: () => void;
  isFallback?: boolean;
}

function Photo({ photo, url, alt, onClick, isFallback = false }: PhotoProps) {
  return (
    <Container onClick={onClick} $isFallback={isFallback}>
      <Thumbnail src={url} alt={alt} />
      {!isFallback && <BookmarkToggle photo={photo} />}
    </Container>
  );
}

export default Photo;

const Container = styled.div<{ $isFallback: boolean }>`
  width: 200px;
  height: 200px;
  position: relative;
  cursor: ${({ $isFallback }) => ($isFallback ? 'initial' : 'pointer')};

  @media ${device.tablet} {
    width: 400px;
    height: 400px;
  }

  @media ${device.mobileL} {
    width: 320px;
    height: 320px;
  }

  @media ${device.mobileS} {
    width: 300px;
    height: 300px;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
