import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { device } from '../../styles/theme';
import 'react-loading-skeleton/dist/skeleton.css';

const PhotoSkeleton = () => {
  return (
    <Container>
      <ResponsiveSkeleton highlightColor="#dbdbdb" />
    </Container>
  );
};

export default PhotoSkeleton;

const Container = styled.div`
  width: 200px;
  height: 200px;

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

const ResponsiveSkeleton = styled(Skeleton)`
  width: 100%;
  height: 100%;
`;
