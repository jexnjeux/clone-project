import { Outlet } from 'react-router-dom';
import Header from './components/shared/Header';
import Menu from './components/shared/Menu';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Menu />
      <Outlet />
    </>
  );
}

export default App;
