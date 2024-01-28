import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PhotoSkeleton = () => {
  return (
    <Container>
      <Skeleton height={200} highlightColor="#dbdbdb" />
    </Container>
  );
};

export default PhotoSkeleton;

const Container = styled.div`
  width: 200px;
`;
