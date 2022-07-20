import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import StoreScreen from './Screens/StoreScreen';

function App(props) {
  
  useEffect(async() => {
    const response = await fetch('/express_backend');
    const body = await response.json();
    console.log(body)
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />}/>
        <Route path="/register" element={<RegisterScreen />}/>
        <Route path="/cart" element={<CartScreen />}/>
        <Route path="/store" element={<StoreScreen />}/>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
