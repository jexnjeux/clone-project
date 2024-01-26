import styled from 'styled-components';
import { PhotoResponse } from '../../types/image';
import Button from '../shared/Button';
import Spacing from '../shared/Spacing';
import useToggleBookmark from '../../hooks/useToggleBookmark';
import { formatCreatedAt } from '../../utils/dateUtils';
import StyledHeartFillIcon from '../../assets/icons/StyledHeartFillIcon';
import StyledHeartLineIcon from '../../assets/icons/StyledHeartLineIcon';

interface ImageDetailsProps {
  image: PhotoResponse;
}

function ImageDetails({ image }: ImageDetailsProps) {
  const { getBookmarkStatus, handleToggleBookmark } = useToggleBookmark();

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleToggleBookmark(image);
  };
  return (
    image && (
      <Container>
        <Top>
          <Name>{image.user.name}</Name>
          <ButtonGroup>
            <IconContainer onClick={(e) => handleBookmarkClick(e)}>
              {getBookmarkStatus(image.id) ? (
                <StyledHeartFillIcon colorname="red" />
              ) : (
                <StyledHeartLineIcon />
              )}
            </IconContainer>
            <Button size="lg">
              <a
                href={image.links.download}
                download
                target="_blank"
                rel="noreferrer"
              >
                다운로드
              </a>
            </Button>
          </ButtonGroup>
        </Top>
        <ImageBox>
          <SelectedImage
            src={image.urls.regular}
            alt={image.alt_description ?? image.id}
          />
        </ImageBox>
        <Spacing size={32} direction="vertical" />
        <Bottom>
          <ImageInfo>
            <ImageInfoBox>
              <Label>이미지 크기</Label>
              <Value>
                {image.width} X {image.height}
              </Value>
            </ImageInfoBox>
            <ImageInfoBox>
              <Label>업로드</Label>
              <Value>{formatCreatedAt(image.created_at)}</Value>
            </ImageInfoBox>
            <ImageInfoBox>
              <Label>다운로드</Label>
              <Value>{image.downloads}</Value>
            </ImageInfoBox>
          </ImageInfo>
          <Spacing size={24} direction="vertical" />
          <TagInfo>
            {image.tags.map((tag) => {
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

export default ImageDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.palette.black};
  font-size: ${({ theme }) => theme.font.lg};
  font-weight: bold;
  line-height: 1.75;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  height: 620px;
`;

const SelectedImage = styled.img`
  height: 100%;
  object-fit: contain;
`;

const Bottom = styled.div``;

const ImageInfo = styled.div`
  display: flex;
  gap: 120px;
`;

const ImageInfoBox = styled.div``;

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
  gap: 16px;
`;

const IconContainer = styled.button`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
