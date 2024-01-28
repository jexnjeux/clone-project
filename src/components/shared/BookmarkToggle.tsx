import styled from 'styled-components';
import { PhotoItem } from '../../types/photos';
import useBookmarkToggle from '../../hooks/useBookmarkToggle';
import StyledHeartLineIcon from '../../assets/icons/StyledHeartLineIcon';
import StyledHeartFillIcon from '../../assets/icons/StyledHeartFillIcon';
import { device } from '../../styles/theme';

interface PhotoProps {
  photo: PhotoItem;
}

function BookmarkToggle({ photo }: PhotoProps) {
  const { handleBookmarkToggle, getBookmarkStatus } = useBookmarkToggle();

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleBookmarkToggle(photo);
  };

  return (
    <IconButton
      onClick={(e) => handleBookmarkClick(e)}
      aria-label="Toggle bookmark"
    >
      {getBookmarkStatus(photo.id) ? (
        <StyledHeartFillIcon color="red" />
      ) : (
        <StyledHeartLineIcon color="white" />
      )}
    </IconButton>
  );
}

export default BookmarkToggle;

const IconButton = styled.button`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 4px;
  bottom: 4px;

  @media ${device.tablet} {
    width: 32px;
    height: 32px;
    right: 8px;
    bottom: 8px;
  }
`;
