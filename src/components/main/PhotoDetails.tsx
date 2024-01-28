import styled from 'styled-components';
import Button from '../shared/Button';
import useToggleBookmark from '../../hooks/useToggleBookmark';
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
  const { getBookmarkStatus, handleToggleBookmark } = useToggleBookmark();

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleToggleBookmark(photo);
  };
  return (
    photo && (
      <Container>
        <Top>
          <Name>{photo.user.name}</Name>
          <ButtonGroup>
            <IconContainer onClick={(e) => handleBookmarkClick(e)}>
              {getBookmarkStatus(photo.id) ? (
                <StyledHeartFillIcon colorname="red" />
              ) : (
                <StyledHeartLineIcon />
              )}
            </IconContainer>
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
          </ButtonGroup>
        </Top>
        <PhotoBox>
          <SelectedPhotoBox
            src={photo.urls.regular}
            alt={photo.alt_description ?? photo.id}
          />
        </PhotoBox>
        <Bottom>
          <PhotoInfo>
            <PhotoInfoBox>
              <Label>이미지 크기</Label>
              <Value>
                {photo.width} X {photo.height}
              </Value>
            </PhotoInfoBox>
            <PhotoInfoBox>
              <Label>업로드</Label>
              <Value>{formatCreatedAt(photo.created_at)}</Value>
            </PhotoInfoBox>
            <PhotoInfoBox>
              <Label>다운로드</Label>
              <Value>{formatNumberWithCommas(photo.downloads)}</Value>
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
        </Bottom>
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

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${device.tablet} {
    align-items: flex-end;
    gap: ${spacing.sm};
  }
`;

const Name = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.palette.black};
  font-size: ${({ theme }) => theme.font.lg};
  font-weight: bold;
  line-height: 1.75;

  @media ${device.tablet} {
    line-height: 1;
  }
`;

const ButtonGroup = styled.div`
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

const Bottom = styled.div`
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

const Label = styled.div`
  padding-bottom: 8px;
  font-weight: bold;
`;

const Value = styled.div`
  color: ${({ theme }) => theme.palette.black};
  font-weight: bold;
`;

const TagInfo = styled.div`
  display: flex;
  gap: ${spacing.md};
`;

const IconContainer = styled.button`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
