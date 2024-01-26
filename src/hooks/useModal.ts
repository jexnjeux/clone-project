import { useState } from 'react';

function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setIsOpen(true);
  };
  const closeModal = () => {
    document.body.style.overflow = '';
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal };
}
export default useModal;
