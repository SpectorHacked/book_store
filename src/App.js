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
import BookDisplayScreen from './Screens/BookDisplayScreen';
import FavoritesScreen from './Screens/FavoritesScreen';
import AdminScreen from './Screens/AdminScreen';
import { getCookieLogin, BOOK_STORE_USER_COOKIE, removeCookie } from './functions';
import _ from 'lodash'
import BestSellersScreen from './Screens/BestSellersScreen';

export async function getDataFromServer(endpoint, query) {
  try {
    const res = await axios.get(endpoint, { params: query })
    return {
      data: res.data,
      status: res.status
    }
  } catch (e) {
    console.log("Error getting data from server")
    return []
  }
}

function checkIfCookie() {
  const res = getCookieLogin(BOOK_STORE_USER_COOKIE)
  if(res) return res;
  return {}
}

function App(props) {
  const [user, setUser] = useState(checkIfCookie())
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [categories, setCategories] = useState([])


  useEffect(() => {
    const getCategories = async() => {
      const res = await getDataFromServer('/categories')
      if(res.data.data) {
        setCategories(res.data.data)
      }
    }
    getCategories()
  }, [])

  const signOut = () => {
    removeCookie()
    setUser({})
  }
  if(_.isEmpty(user)) { 
    return <LoginScreen setUser={setUser}/>
  } 

  return (
    <>
      <BrowserRouter>
          <NavBar signOut={signOut} user={user} cartLength={cart.length}/>
          <Routes>
            <Route path="*" element={<StoreScreen favorites={favorites} setFavorites={setFavorites} categories={categories} cart={cart} setCart={setCart}/>}/>
            <Route path="cart" element={<CartScreen setCart={setCart} cart={cart}/>}/>
            <Route path="favorites" element={<FavoritesScreen cart={cart} setCart={setCart} favorites={favorites} setFavorites={setFavorites} cart={cart}/>}/>
            <Route path="best-sellers" element={<BestSellersScreen cart={cart} setCart={setCart} favorites={favorites} setFavorites={setFavorites}/>}/>
            <Route path="admin" element={<AdminScreen/>}/>
            <Route path="book/:isbn" element={<BookDisplayScreen setFavorites={setFavorites} favorites={favorites} cart={cart}/>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}


function getLocalStorage() {
  return AsyncStorage.getItem('user')
    .then((e) => e)
    .catch((e) => {
      console.log(e)
      return {}
    })
}
export default App;
