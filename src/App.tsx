import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/shared/Header';
import Menu from './components/shared/Menu';

function App() {
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
