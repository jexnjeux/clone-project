import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/shared/Header';
import Menu from './components/shared/Menu';
import { spacing } from './styles/theme';

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
  padding-bottom: ${spacing[8]};
  overflow-y: scroll;
`;
