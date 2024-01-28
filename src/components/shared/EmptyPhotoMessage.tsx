import styled from 'styled-components';

interface EmptyPhotoMessageProps {
  page: 'main' | 'bookmark';
}

function EmptyPhotoMessage({ page }: EmptyPhotoMessageProps) {
  const message: { [key: string]: string } = {
    main: '검색 결과가 없습니다. 다른 키워드로 검색해 보세요.',
    bookmark:
      '아직 북마크한 사진이 없습니다. 마음에 드는 사진을 북마크해 보세요.',
  };

  return <EmptyMessage>{message[page]}</EmptyMessage>;
}

export default EmptyPhotoMessage;

const EmptyMessage = styled.p`
  margin-top: 10rem;
  text-align: center;
  font-weight: bold;
`;
