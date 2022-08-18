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
import { UserContext } from './Context/UserContext';


import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import NavBar from './Components/NavBar';

const { Header, Content, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});


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

  const [cart, setCart] = useState([])
  const [user, setUser] = useState()
  const [data, setData] = useState([])
  useEffect(async() => {
    const response = await getDataFromServer('/search',{filters: {}})
    setData(response)
    // console.log(response)
  },[])

  return (
      <BrowserRouter>
        <UserContext.Provider value={user}>
          <Routes>
              <Route path="/login" element={<LoginScreen setUser={setUser}/>}/>
              <Route path="/register" element={<RegisterScreen setUser={setUser} />}/>
              <Route path="/" element={<LayoutComponent data={data}/>}/>
                {/* <AppBar/> */}
                {/* <Route path="/cart">
                  {user ? <CartScreen setCart={setCart} cart={cart}/> : <Navigate to={`/login`} />}
                </Route>
                <Route path="/">
                  {user ? <StoreScreen setCart={setCart} cart={cart}/> : <Navigate to={`/login`} />}
                </Route> */}
              {/* </Route>   */}
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

function LayoutComponent({data}) {
  return(
    <>
      <NavBar/>
      <StoreScreen data={data}/>
    </>
  )
}

export default App;
