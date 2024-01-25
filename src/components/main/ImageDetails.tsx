import styled from 'styled-components';
import { PhotoResponse } from '../../types/image';
import SolidHeartIcon from '../../assets/icons/SolidHeartIcon';
import StyledOutlinedHeartIcon from '../../assets/icons/StyledOutlinedHeartIcon';
import Button from '../shared/Button';
import Spacing from '../shared/Spacing';

interface ImageDetailsProps {
  image: PhotoResponse | null;
}

function ImageDetails({ image }: ImageDetailsProps) {
  return (
    image && (
      <Container>
        <Top>
          <Name>{image.user.name}</Name>
          <ButtonGroup>
            {image.liked_by_user ? (
              <SolidHeartIcon />
            ) : (
              <StyledOutlinedHeartIcon width={30} />
            )}
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
              <Value>{image.created_at}</Value>
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
