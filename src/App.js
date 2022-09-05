import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import StoreScreen from './Screens/StoreScreen';
import axios from 'axios';
import NavBar from './Components/NavBar';
import BookDisplayScreen from './Screens/BookDisplayScreen';
import FavoritesScreen from './Screens/FavoritesScreen';
import AdminScreen from './Screens/AdminScreen';
import { getCookieLogin, BOOK_STORE_USER_COOKIE, removeCookie, addLogActivity } from './functions';
import _ from 'lodash'
import BestSellersScreen from './Screens/BestSellersScreen';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import RegisterScreen from './Screens/RegisterScreen';
import { ADD_ITEM_TO_CART_LOG, LOGOUT_LOG } from './constants';
import AuthControl from './Screens/AuthControl';
import NewsletterScreen from './Screens/NewsletterScreen';
import { CART_KEY, FAVORITES_KEY, getLocalByKey, removeLocalByKey, updateLocalItems } from './persist';
import Readme from './Screens/readmeScreen';

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

function App() {
  const [user, setUser] = useState(checkIfCookie())
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [categories, setCategories] = useState([])
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const getCategories = async() => {
      const res = await getDataFromServer('/categories')
      if(res.data.data) {
        setCategories(res.data.data)
      }
    }
    const getPersist = async() => {
      const storageFavorites = await getLocalByKey('favorites')
      const storageCart = await getLocalByKey('cart')
      setFavorites(storageFavorites)
      setCart(storageCart)
    }
    getCategories()
    getPersist()
  }, [])

  if(_.isEmpty(user)) { 
    return <AuthControl setUser={setUser}/>
  } 

  const signOut = async() => {
    addLogActivity(LOGOUT_LOG, user.id)
    await removeLocalByKey(CART_KEY)
    await removeLocalByKey(FAVORITES_KEY)
    removeCookie()
    setUser({})
  }

  async function handleAddCartClick(array) {
    addLogActivity(ADD_ITEM_TO_CART_LOG, user.id)
    await updateLocalItems(CART_KEY, array)
    if(cart.length !== array.length && array.length) {
      setShowToast(!showToast)
    }
    setCart(array)
  }
  async function handleAddToFavorites(arr) {
    await updateLocalItems(FAVORITES_KEY, arr)
    setFavorites(arr)
  }
  return (
    <>
      <BrowserRouter>
          <NavBar signOut={signOut} user={user} cartLength={cart.length}/>
          <Routes>
            <Route path="*" element={<StoreScreen favorites={favorites} setFavorites={handleAddToFavorites} categories={categories} cart={cart} setCart={handleAddCartClick}/>}/>
            <Route path="cart" element={<CartScreen user={user} setCart={handleAddCartClick} cart={cart}/>}/>
            <Route path="favorites" element={<FavoritesScreen cart={cart} setCart={handleAddCartClick} favorites={favorites} setFavorites={handleAddToFavorites}/>}/>
            <Route path="best-sellers" element={<BestSellersScreen cart={cart} setCart={handleAddCartClick} favorites={favorites} setFavorites={handleAddToFavorites}/>}/>
            <Route path="Newsletter" element={<NewsletterScreen/>}/>
            <Route path="readme.html" element={<Readme/>}/>
            <Route path="admin" element={<AdminScreen user={user}/>}/>
            <Route path="book/:isbn" element={<BookDisplayScreen setFavorites={handleAddToFavorites} favorites={favorites} cart={cart}/>}/>
          </Routes>
          <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'center'}} open={showToast} autoHideDuration={3000} onClose={() => setShowToast(false)}>
            <MuiAlert onClose={() => setShowToast(false)} severity="success" sx={{ width: '100%' }}>
              Successfully added to cart!
            </MuiAlert>
          </Snackbar>
      </BrowserRouter>
    </>
  );
}

export default App;
