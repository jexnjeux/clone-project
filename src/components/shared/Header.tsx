import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from './Button';
import Spacing from './Spacing';
import StyledHeartLineIcon from '../../assets/icons/StyledHeartLineIcon';

function Header() {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Nav>
          <Link to="/">
            <img src="/public/images/logo.png" alt="logo" width={120} />
          </Link>
          <RightSection>
            <Button $solid size="lg">
              사진제출
            </Button>
            <Spacing size={10} />
            <Link to="/bookmark">
              <Button size="lg">
                <BookmarkButtonWrap>
                  <BookmarkText>북마크</BookmarkText>
                  <Spacing size={4} />
                  <ButtonContainer>
                    <StyledHeartLineIcon />
                  </ButtonContainer>
                </BookmarkButtonWrap>
              </Button>
            </Link>

            <Spacing size={10} />
            <div>
              <UserInfo>Evie | evie@willog.io</UserInfo>
            </div>
          </RightSection>
        </Nav>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  height: 76px;
  z-index: 10;
`;

const HeaderWrapper = styled.div`
  padding: 10px 20px 0;
  background-color: #fff;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  gap: 1rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const BookmarkButtonWrap = styled.div`
  display: flex;
  align-items: center;
`;

const BookmarkText = styled.span`
  display: inline-block;
  line-height: 1;
`;

const UserInfo = styled.span`
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  width: 20px;
  height: 20px;
`;
