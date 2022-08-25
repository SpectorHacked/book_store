import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {  Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';

const HEADER_HEIGHT = 150
const CART_ICON_SIZE = 80
const Options = [
    {label:'Home',key:'', },
    {label:'Best Fit',key:'best-fit', },
    {label:'Newsletter', key:'newsletter'}, 
    {label:'Favorites',key:'favorites' },
    {label:'On Sales',key:'sales' },
]
export default function NavBar({cartLength}) {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          {Options.map(e => {
            return(
              <Typography onClick={() => console.log(e.key)} noWrap variant="h6" component="div" sx={{ flexGrow: 1, maxWidth: 120 }}>
                  <Link to={e.key}>{e.label}</Link>
              </Typography>
              )})}
          <div style={{display:'flex', justifyContent:'flex-end', flexGrow: 1}}>
            <Link to={"cart"}>
              <Avatar>
                <ShoppingCartIcon/>
                {cartLength && <div style={{position:'absolute', bottom: 20, right: 20, paddin:10,borderRadius: 30}}>{cartLength}</div>}
              </Avatar>
              </Link>
          </div>  
        </Toolbar>
      </AppBar>
    </Box>
  );
};