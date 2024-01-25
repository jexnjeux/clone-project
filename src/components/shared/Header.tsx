import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from './Button';
import Spacing from './Spacing';
import StyledOutlinedHeartIcon from '../../assets/icons/StyledOutlinedHeartIcon';

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
            <Button size="lg">
              <Link to="/bookmark">
                <BookmarkButtonWrap>
                  <BookmarkText>북마크</BookmarkText>
                  <Spacing size={4} />
                  <StyledOutlinedHeartIcon />
                </BookmarkButtonWrap>
              </Link>
            </Button>

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
`;

const BookmarkText = styled.span`
  display: inline-block;
`;

const UserInfo = styled.span`
  font-weight: bold;
`;
