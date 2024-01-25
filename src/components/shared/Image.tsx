import styled from 'styled-components';
import StyledOutlinedHeartIcon from '../../assets/icons/StyledOutlinedHeartIcon';
import StyeldSolidHeartIcon from '../../assets/icons/SolidHeartIcon';

interface ImageProps {
  url: string;
  alt: string;
  liked?: boolean;
  onClick: () => void;
}

function Image({ url, alt, liked, onClick }: ImageProps) {
  return (
    <Container onClick={onClick}>
      <Thumbnail src={url} alt={alt} />
      <IconContainer>
        {liked ? (
          <StyeldSolidHeartIcon />
        ) : (
          <StyledOutlinedHeartIcon width="20px" colorName="white" />
        )}
      </IconContainer>
    </Container>
  );
}

export default Image;

const Container = styled.div`
  width: 160px;
  height: 160px;
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
