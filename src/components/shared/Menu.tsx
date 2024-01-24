import { useState } from 'react';
import { useLocation } from 'react-router';
import { css, styled } from 'styled-components';
import menuItems from '../../data/menuItems';

interface ItemProps {
  id: number;
  title: string;
}

function Menu() {
  const { pathname } = useLocation();

  const [active, setActive] = useState({
    main: true,
    menu: 1,
  });

  const handleMenuClick = (id: number, type: 'main' | 'menu') => {
    setActive(() => ({
      main: type === 'main',
      menu: id,
    }));
  };

  const isMain = pathname === '/';
  const currentMenuItems = isMain
    ? menuItems.main
    : menuItems[pathname.replace('/', '')];

  return (
    <Container>
      <OuterWrapper>
        <Wrapper>
          {isMain ? (
            <>
              <MainWrap>
                <MenuBox>
                  {menuItems.mainMenuItems.map((item: ItemProps) => {
                    return (
                      <MenuItemWrap $main key={item.id}>
                        <MenuItem
                          $active={active.main && active.menu === item.id}
                          onClick={() => handleMenuClick(item.id, 'main')}
                        >
                          {item.title}
                        </MenuItem>
                      </MenuItemWrap>
                    );
                  })}
                </MenuBox>
              </MainWrap>
              <Divider />
            </>
          ) : null}
          <MenuWrap>
            {currentMenuItems.map((item: ItemProps) => {
              return (
                <MenuBox key={item.id}>
                  <Item>
                    <MenuItem
                      $active={!active.main && active.menu === item.id}
                      onClick={() => handleMenuClick(item.id, 'menu')}
                    >
                      {item.title}
                    </MenuItem>
                  </Item>
                </MenuBox>
              );
            })}
          </MenuWrap>
        </Wrapper>
      </OuterWrapper>
    </Container>
  );
}

export default Menu;

const Container = styled.div`
  position: sticky;
  top: 76px;
  background-color: ${({ theme }) => theme.palette.background};
  z-index: 10;
`;

const OuterWrapper = styled.div`
  padding: 0 2.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const MainWrap = styled.div`
  display: flex;
`;

const Divider = styled.div`
  width: 2px;
  height: 1.75rem;
  background-color: ${({ theme }) => theme.palette.gray400};
`;

const MenuWrap = styled.div`
  display: flex;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none !important;
  }
`;

const Item = styled.div`
  padding: 0 2rem;
`;

const MenuBox = styled.ul`
  display: flex;
  align-items: center;
  column-gap: 24px;
`;

const MenuItemWrap = styled.div<{ $main?: boolean }>`
  padding: 0 2rem;
  ${({ $main }) =>
    $main &&
    css`
      padding: 0 1rem;
    `}
`;

const MenuItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  height: 42px;
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.palette.black};
  }

  ${(props) =>
    props.$active &&
    css`
      box-shadow: ${({ theme }) => `inset 0 -2px ${theme.palette.black}`};
      color: ${({ theme }) => theme.palette.black};
    `}
`;
