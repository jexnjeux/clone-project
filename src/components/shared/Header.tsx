import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from './Button';
import { device, palette, spacing } from '../../styles/theme';
import StyledHeartLineIcon from '../../assets/icons/StyledHeartLineIcon';
import MenuIcon from '../../assets/icons/MenuIcon';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClcik = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Nav>
          <Link to="/">
            <Logo src="/logo.png" alt="logo" />
            <MobileLogo src="/mobile-logo.png" alt="logo" />
          </Link>
          <IconContainer onClick={handleMenuClcik}>
            <MenuIcon />
          </IconContainer>
          {isMenuOpen && (
            <MobileMenuContainer>
              <ul>
                <MobileMenuItem onClick={handleMenuClcik}>
                  <StyledHeartLineIcon width={20} height={20} />
                  <StyledLink to="/bookmark">북마크</StyledLink>
                </MobileMenuItem>
              </ul>
            </MobileMenuContainer>
          )}
          <RightSection>
            <Button $solid size="lg">
              사진제출
            </Button>
            <Link to="/bookmark">
              <Button size="lg">
                <BookmarkButtonWrap>
                  <BookmarkText>북마크</BookmarkText>
                  <ButtonContainer>
                    <StyledHeartLineIcon />
                  </ButtonContainer>
                </BookmarkButtonWrap>
              </Button>
            </Link>
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
  z-index: 11;
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
`;

const Logo = styled.img`
  width: 120px;

  @media ${device.tablet} {
    display: none;
  }
`;

const MobileLogo = styled.img`
  display: none;
  width: 46px;

  @media ${device.tablet} {
    display: block;
  }
`;

const IconContainer = styled.div`
  display: none;

  @media ${device.tablet} {
    display: block;
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  margin-top: 2px;
`;

const MobileMenuContainer = styled.div`
  display: none;

  @media ${device.tablet} {
    display: block;
    position: absolute;
    top: 52px;
    right: 22px;
    width: 240px;
    height: 130px;
    padding: 1rem;
    border: 1px solid ${palette.gray600};
    border-radius: 6px;
    background-color: ${palette.background};
    z-index: 20;
  }
`;

const MobileMenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  font-weight: bold;
  cursor: pointer;
`;

const BookmarkButtonWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};

  @media ${device.tablet} {
    display: none;
  }
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
