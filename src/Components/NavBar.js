import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {  Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import Logo from '../assets/logo.png'
import { DARK_COLOR, LIGHT_COLOR, Options } from '../constants';
import { Button } from '@mui/material';

export default function NavBar({cartLength, signOut}) {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" style={{backgroundColor: DARK_COLOR}}>
        <div style={{display:'flex', justifyContent:'center'}}>
          <img src={Logo} width={400} height={300}/>
        </div>
        <Toolbar>
          {Options.map((e,i) => {
            return(
              <Typography key={i.toString()} noWrap variant="h5" component="div" sx={{ flexGrow: 1, maxWidth: 120, textDecoration: 'none'}}>
                  <Link to={e.key} style={{color:LIGHT_COLOR, textDecoration: 'none'}}>{e.label}</Link>
              </Typography>
              )})}
          <div style={{display:'flex', justifyContent:'flex-end', flexGrow: 1}}>
            <Link to={"cart"}>
                <Avatar sx={{backgroundColor:LIGHT_COLOR}}>
                  {cartLength && <div style={{position:'absolute', top: 15, left: 23, padding: 1}}><b style={{fontSize: 17, color: 'blue', fontWeight:'700'}}>{cartLength}</b></div>}
                  <ShoppingCartIcon sx={{color: DARK_COLOR}}/>
                </Avatar>
            </Link>
            <Button variant='primary' onClick={() => signOut()}>
                <Typography sx={{color:LIGHT_COLOR, textTransform:'none'}}>Sign out</Typography>
            </Button>
          </div>  
        </Toolbar>
      </AppBar>
    </Box>
  );
};