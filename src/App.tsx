import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/shared/Header';
import Menu from './components/shared/Menu';
import { useEffect } from 'react';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <Menu />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default App;

const Layout = styled.div`
  padding-bottom: 2rem;
  overflow-y: scroll;
`;
