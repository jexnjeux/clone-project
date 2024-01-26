import { useState } from 'react';
import ImageDetails from '../components/main/ImageDetails';
import Modal from '../components/shared/Modal';
import useModal from '../hooks/useModal';
import { ImageItem } from '../types/image';
import styled from 'styled-components';
import Images from '../components/main/Images';
import Image from '../components/shared/Image';
import { useBookmarkStore } from '../stores/bookmark';
import { fetchImageDetails } from '../apis/main/photo';

function BookmarkPage() {
  const { openModal, closeModal, isOpen } = useModal();
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const bookmarks = useBookmarkStore((state) => state.bookmarks);

  const handleClickImage = async (id: string) => {
    try {
      const data = await fetchImageDetails(id);
      setSelectedImage(data ?? null);
      openModal();
    } catch (e) {
      console.error(e);
      setSelectedImage(null);
    }
  };

  const bookmarkedImages = Object.values(bookmarks).filter(Boolean);

  return (
    <>
      {isOpen && selectedImage ? (
        <Modal
          closeModal={closeModal}
          isOpen={isOpen}
          content={<ImageDetails image={selectedImage} />}
        />
      ) : null}

      <Container>
        <Images $totalImages={bookmarkedImages.length}>
          {bookmarkedImages.length > 0 &&
            bookmarkedImages.map((image) => {
              if (!image) {
                return;
              }
              return (
                <Image
                  key={image.id}
                  image={image}
                  url={image.urls.thumb}
                  alt={image.alt_description ?? image.id}
                  onClick={() => void handleClickImage(image.id)}
                />
              );
            })}
        </Images>
      </Container>
    </>
  );
}

export default BookmarkPage;

const Container = styled.div`
  padding-bottom: 24px;
`;
