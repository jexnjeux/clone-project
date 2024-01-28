import styled from 'styled-components';
import Spinner from '../../assets/gif/spinner.gif';

function Loading() {
  return (
    <>
      <Container>
        <Wrapper>
          <StyledSpinner src={Spinner} alt="loading" />
        </Wrapper>
      </Container>
    </>
  );
}

export default Loading;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.4;
  z-index: 10;
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 5rem;
  width: 400px;
  height: 400px;
`;

const StyledSpinner = styled.img``;
