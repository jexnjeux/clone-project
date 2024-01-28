import ReactDOM from 'react-dom';
import { styled } from 'styled-components';
import Dimmed from './Dimmed';
import StyledCloseIcon from '../../assets/icons/CloseIcon';
import { useEffect, useRef } from 'react';
import { device, palette, spacing } from '../../styles/theme';

interface ModalProps {
  isOpen?: boolean;
  content?: React.ReactNode;
  closeModal: () => void;
}

function Modal({ isOpen, content, closeModal }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      modalRef.current.style.top = `${scrollY + window.innerHeight / 2}px`;
    }
  }, [isOpen]);

  if (!isOpen) {
    return;
  }

  const modalRoot = document.getElementById('modal-root') as HTMLElement;

  return modalRoot
    ? ReactDOM.createPortal(
        <>
          <Dimmed closeModal={closeModal} />
          <Container ref={modalRef}>
            <CloseButton onClick={closeModal}>
              <StyledCloseIcon />
            </CloseButton>
            <ContentWrapper>{content}</ContentWrapper>
          </Container>
        </>,
        modalRoot,
      )
    : null;
}

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  width: 85vw;
  height: 90vh;
  padding: 3rem;
  background-color: ${palette.white};
  border-radius: 8px;
  overflow-y: visible;
  z-index: 15;

  @media ${device.tablet} {
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    height: 600px;
  }
`;

const CloseButton = styled.button`
  width: 20px;
  height: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;

  @media ${device.tablet} {
    width: 100%;
  }
`;
export default Modal;
