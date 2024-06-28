import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import Nav from './component/navbar.jsx';
import Register from './component/register.jsx';
import Login from './component/login.jsx';

function App() {
  return (
  <>
<Nav />
<BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
