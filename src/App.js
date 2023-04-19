import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Product/Home';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import { ToastContainer } from 'react-toastify';
import Appheader from './Authentication/AppHeader';
function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
      <Appheader></Appheader>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes> 
      </BrowserRouter>
      
    </div>
  );
}

export default App;
