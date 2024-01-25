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
      console.log({ scrollY });
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
          <Dimmed />
          <Container ref={modalRef}>
            <CloseButton onClick={closeModal}>
              <StyledCloseIcon />
            </CloseButton>
            <div>{content}</div>
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
  width: 85vw;
  height: 90vh;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 8px;
  overflow: hidden;
  z-index: 15;
`;

const CloseButton = styled.button`
  margin-right: ${({ theme }) => theme.spacing.md};
`;

export default Modal;
