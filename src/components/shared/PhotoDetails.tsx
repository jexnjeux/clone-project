import styled from 'styled-components';
import Button from './Button';
import useBookmarkToggle from '../../hooks/useBookmarkToggle';
import { formatCreatedAt } from '../../utils/dateUtils';
import { formatNumberWithCommas } from '../../utils/numberUtils';
import StyledHeartFillIcon from '../../assets/icons/StyledHeartFillIcon';
import StyledHeartLineIcon from '../../assets/icons/StyledHeartLineIcon';
import { PhotoItem } from '../../types/photos';
import { device, spacing } from '../../styles/theme';

interface PhotoDetailsProps {
  photo: PhotoItem;
}

function PhotoDetails({ photo }: PhotoDetailsProps) {
  const { getBookmarkStatus, handleBookmarkToggle } = useBookmarkToggle();

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleBookmarkToggle(photo);
  };
  return (
    photo && (
      <Container>
        <TopSection>
          <PhotographerName>{photo.user.name}</PhotographerName>
          <ActionButtonGroup>
            <BookmarkButton onClick={(e) => handleBookmarkClick(e)}>
              {getBookmarkStatus(photo.id) ? (
                <StyledHeartFillIcon color="red" />
              ) : (
                <StyledHeartLineIcon />
              )}
            </BookmarkButton>
            <Button size="lg">
              <a
                href={photo.links.download}
                download
                target="_blank"
                rel="noreferrer"
              >
                다운로드
              </a>
            </Button>
          </ActionButtonGroup>
        </TopSection>
        <PhotoBox>
          <SelectedPhotoBox
            src={photo.urls.regular}
            alt={photo.alt_description ?? photo.id}
          />
        </PhotoBox>
        <InfoSection>
          <PhotoInfo>
            <PhotoInfoBox>
              <InfoLabel>이미지 크기</InfoLabel>
              <InfoValue>
                {photo.width} X {photo.height}
              </InfoValue>
            </PhotoInfoBox>
            <PhotoInfoBox>
              <InfoLabel>업로드</InfoLabel>
              <InfoValue>{formatCreatedAt(photo.created_at)}</InfoValue>
            </PhotoInfoBox>
            <PhotoInfoBox>
              <InfoLabel>다운로드</InfoLabel>
              <InfoValue>{formatNumberWithCommas(photo.downloads)}</InfoValue>
            </PhotoInfoBox>
          </PhotoInfo>
          <TagInfo>
            {photo.tags.map((tag) => {
              return (
                <Button $cursorunset key={tag} $solid size="md">
                  {tag}
                </Button>
              );
            })}
          </TagInfo>
        </InfoSection>
      </Container>
    )
  );
}

export default PhotoDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${spacing.xl2};
  height: 100%;

  @media ${device.tablet} {
    gap: ${spacing.md};
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${device.tablet} {
    align-items: flex-end;
    gap: ${spacing.sm};
  }
`;

const PhotographerName = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.palette.black};
  font-size: ${({ theme }) => theme.font.lg};
  font-weight: bold;
  line-height: 1.75;

  @media ${device.tablet} {
    line-height: 1;
  }
`;

const ActionButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const PhotoBox = styled.div`
  display: flex;
  justify-content: center;

  @media ${device.tablet} {
    height: 320px;
  }
`;

const SelectedPhotoBox = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: contain;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${spacing.xl};

  @media ${device.tablet} {
    gap: ${spacing.sm};
  }
`;

const PhotoInfo = styled.div`
  display: flex;
  gap: ${spacing.xl3};

  @media ${device.tablet} {
    gap: ${spacing.xl2};
  }
`;

const PhotoInfoBox = styled.div``;

const InfoLabel = styled.div`
  padding-bottom: 8px;
  font-weight: bold;
`;

const InfoValue = styled.div`
  color: ${({ theme }) => theme.palette.black};
  font-weight: bold;
`;

const TagInfo = styled.div`
  display: flex;
  gap: ${spacing.md};
`;

const BookmarkButton = styled.button`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
