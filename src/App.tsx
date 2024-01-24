import { Outlet } from 'react-router-dom';
import Header from './components/shared/Header';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
