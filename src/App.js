import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import StoreScreen from './Screens/StoreScreen';
import axios from 'axios';
import NavBar from './Components/NavBar';

export async function getDataFromServer(endpoint, query) {
  try {
    const res = await axios.get(endpoint, { params: query })
    const data = res.data.data;
    return data;
  } catch (e) {
    console.log("Error getting data from server")
    console.error(e)
    return []
  }
}

// const filterMockup = {
//   'status': ['MEAP'],
//   'categories': ['Java']
// }

function App(props) {

  const [user, setUser] = useState({})
  const [cart, setCart] = useState([])

  const signOut = () => {
    setUser({})
  }
  if(!user) { // Change here to get to the desired page
    return <RegisterScreen setUser={setUser}/>
    //return <LoginScreen setUser={setUser}/>
  } // Remove this to get to the actual app

  return (
    <>
      <BrowserRouter>
          <NavBar signOut={signOut} user={user} cartLength={cart.length}/>
          <Routes>
            <Route path="*" element={<StoreScreen />}/>
            <Route path="cart" element={<CartScreen />}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
