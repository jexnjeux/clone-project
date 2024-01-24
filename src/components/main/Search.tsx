import { styled } from 'styled-components';
import Spacing from '../shared/Spacing';
import SearchIcon from '../../assets/icons/SearchIcon';

interface SearchProps {
  onChangeSearchTerms: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateImageState: () => Promise<void>;
}

function Search({ onChangeSearchTerms, updateImageState }: SearchProps) {
  return (
    <Top>
      <ContentContainer>
        <ContentWrap>
          <div style={{ width: '100%' }}>
            <ContentBox>
              <Section>
                <Title>Will Photo</Title>
                <Description>인터넷의 시각 자료 출처입니다.</Description>
                <Description>
                  모든 지역에 있는 크리에이터들의 지원을 받습니다.
                </Description>
                <Spacing direction="vertical" size={16} />
                <SearchBox>
                  <StyledInput onChange={onChangeSearchTerms} />
                  <Button onClick={() => void updateImageState()}>
                    <SearchIcon />
                  </Button>
                </SearchBox>
              </Section>
            </ContentBox>
          </div>
        </ContentWrap>
      </ContentContainer>
      <StyledImg src="/public/images/mainImage.jpg" alt="image" />
    </Top>
  );
}
export default Search;

const Top = styled.div`
  height: 300px;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  position: relative;
`;

const ContentWrap = styled.div`
  position: absolute;
  width: 100%;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  padding: 0 20rem;
`;

const Section = styled.section`
  width: 100%;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.palette.white};
  font-size: 3rem;
  font-weight: bold;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.palette.white};
  font-size: 1rem;
  line-height: 1.5;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
`;

const SearchBox = styled.div`
  position: relative;
`;

const Button = styled.button`
  position: absolute;
  top: calc(50% - 14px);
  right: 12px;
  color: ${({ theme }) => theme.palette.gray600};
`;
