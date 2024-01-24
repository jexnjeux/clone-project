import { styled } from 'styled-components';
import Search from '../components/main/Search';
import useSearch from '../hooks/useSearch';
import Images from '../components/main/Images';
import Image from '../components/shared/Image';

function MainPage() {
  const { handleSearchTermsChange, updateImageState, images } = useSearch();

  return (
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
              liked={true}
            />
          );
        })}
      </Images>
    </Container>
  );
}

export default MainPage;

const Container = styled.div``;
