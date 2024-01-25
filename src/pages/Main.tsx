import { styled } from 'styled-components';
import Search from '../components/main/Search';
import useSearch from '../hooks/useSearch';
import useModal from '../hooks/useModal';
import Images from '../components/main/Images';
import Image from '../components/shared/Image';
import ImageDetails from '../components/main/ImageDetails';
import Modal from '../components/shared/Modal';
import { useState } from 'react';
import { ImageItem, PhotoResponse } from '../types/image';
import { fetchImageDetails } from '../apis/main/photo';

function MainPage() {
  const { handleSearchTermsChange, updateImageState, images } = useSearch();
  const { openModal, closeModal, isOpen } = useModal();

  const [selectedImage, setSelectedImage] = useState<PhotoResponse | null>(
    null,
  );

  const handleClickImage = async (image: ImageItem) => {
    const id = image.id;
    try {
      const data = await fetchImageDetails(id);
      setSelectedImage(data ?? null);
      openModal();
    } catch (e) {
      console.error(e);
      setSelectedImage(null);
    }
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
                onClick={() => void handleClickImage(image)}
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
