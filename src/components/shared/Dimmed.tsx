import { styled } from 'styled-components';

interface DimmedProps {
  closeModal: () => void;
}

function Dimmed({ closeModal }: DimmedProps) {
  return <Container onClick={closeModal} />;
}

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.palette.black};
  opacity: 0.5;
  z-index: 12;
`;

export default Dimmed;
