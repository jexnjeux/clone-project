import styled from 'styled-components';

function Photos({
  children,
  $totalImages,
}: {
  children: React.ReactNode;
  $totalImages: number;
}) {
  return (
    <Container>
      <Wrapper $totalImages={$totalImages}>{children}</Wrapper>
    </Container>
  );
}

export default Photos;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing.xl2};
`;

const Wrapper = styled.div<{ $totalImages: number }>`
  display: grid;
  grid-template-columns: ${({ $totalImages }) =>
    $totalImages < 4 ? `repeat(${$totalImages}, 1fr)` : 'repeat(4, 1fr)'};
  grid-template-rows: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
`;
