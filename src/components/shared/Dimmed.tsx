import { styled } from 'styled-components';

function Dimmed() {
  return <Container />;
}

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.palette.black};
  opacity: 0.5;
  z-index: 4;
`;

export default Dimmed;
