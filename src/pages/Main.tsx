import { styled } from 'styled-components';
import Search from '../components/main/Search';
import useSearch from '../hooks/useSearch';
import useModal from '../hooks/useModal';
import Images from '../components/main/Images';
import Image from '../components/shared/Image';
import ImageDetails from '../components/main/ImageDetails';
import Modal from '../components/shared/Modal';
import { useState } from 'react';
import { ImageItem } from '../types/search';

function MainPage() {
  const { handleSearchTermsChange, updateImageState, images } = useSearch();
  const { openModal, closeModal, isOpen } = useModal();

  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const handleClickImage = (image: ImageItem) => {
    setSelectedImage(image);
    openModal();
  };

  return (
    <>
      {isOpen ? (
        <Modal
          closeModal={closeModal}
          isOpen={isOpen}
          content={<ImageDetails image={selectedImage} />}
        />
      ) : null}
      <Container>
        <Search
          onChangeSearchTerms={handleSearchTermsChange}
          updateImageState={updateImageState}
        />
        <Images>
          {images.map((image) => {
            return (
              <Image
                key={image.id}
                alt={image.alt_description ?? image.id}
                url={image.urls.thumb}
                liked={image.liked_by_user}
                onClick={() => handleClickImage(image)}
              />
            );
          })}
        </Images>
      </Container>
    </>
  );
}

export default MainPage;

const Container = styled.div``;
