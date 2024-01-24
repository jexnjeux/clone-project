import { styled } from 'styled-components';
import Search from '../components/main/Search';
import useSearch from '../hooks/useSearch';

function MainPage() {
  const { handleSearchTermsChange, updateImageState, images } = useSearch();

  console.log({ images });
  return (
    <Container>
      <Search
        onChangeSearchTerms={handleSearchTermsChange}
        updateImageState={updateImageState}
      />
      {images.map((image) => {
        return (
          <img
            key={image.id}
            alt={image.alt_description ?? image.id}
            src={image.urls.thumb}
          />
        );
      })}
    </Container>
  );
}

export default MainPage;

const Container = styled.div``;
