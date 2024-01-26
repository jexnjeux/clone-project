import ReactDOM from 'react-dom';
import { styled } from 'styled-components';
import Dimmed from './Dimmed';
import StyledCloseIcon from '../../assets/icons/CloseIcon';
import { useEffect, useRef } from 'react';

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
  align-items: flex-start;
  justify-content: space-between;
  width: 85vw;
  height: 90vh;
  padding: ${({ theme }) => theme.spacing.xl2};
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 8px;
  overflow-y: visible;
  z-index: 15;
`;

const CloseButton = styled.button`
  margin-top: 5px;
  margin-right: ${({ theme }) => theme.spacing.md};
  width: 20px;
  height: 20px;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  padding-left: 2rem;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
`;
export default Modal;
