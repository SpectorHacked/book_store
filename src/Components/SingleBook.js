import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {  Link } from "react-router-dom";
import { LIGHT_COLOR, DARK_COLOR, centerObjectCSS } from '../constants';
import FavoritesIcon from './FavoritesIcon';
import AddShoppingIcon from './AddShoppingIcon';
import InfoIcon from './InfoIcon';

const IMAGE_HEIGHT = 180

export default function SingleBook({item, setCart, cart, setFavorites, favorites, gridSize=4, isFavorite}) {
  const {title, thumbnailUrl, status,  authors, categories, isbn, pageCount, longDescription, shortDescription} = item
  function handleFavoritesClick() {
    let newArray;
    if(isFavorite) {
        newArray = favorites.filter(e => e.isbn !== isbn)
    } else {
        newArray = [...favorites, item]
    }
    setFavorites(newArray)
  }

  function handleCartClick() {
    setCart([...cart, item])
  }

  return (
    <Grid item xs={gridSize}>
        <Card sx={{ maxWidth: 350, minHeight: 600, backgroundColor: LIGHT_COLOR, display:'flex', flexDirection:'column' }}>
            <div style={{ flex: 2}}>
                <CardMedia
                    component="img"
                    height={IMAGE_HEIGHT}
                    image={thumbnailUrl}
                    alt={title}
                    />
            </div>
            <div style={{flex: 4}}>
                <CardContent>
                    <Typography variant="h5" component="div" color={DARK_COLOR}>
                        {title}
                    </Typography>
                    <div style={{margin: 4}}>
                        <Typography variant="body2" color="text.secondary">
                            {shortDescription}
                        </Typography>
                    </div>
                </CardContent>
            </div>
            <div style={{flex: 2, maxHeight: 80, ...centerObjectCSS }}>
                <CardActions sx={{display:'flex', justifyContent:'space-around'}}>
                    <Button variant="primary" size="small">
                        <Link to={`book/${isbn}`}>
                            <InfoIcon/>
                        </Link>
                    </Button>
                    <Button variant="primary" size="small" onClick={() => handleCartClick()}>
                        <AddShoppingIcon/>
                    </Button>
                    <Button variant="primary" size="small" onClick={() => handleFavoritesClick()}>
                        <FavoritesIcon isFavorite={isFavorite}/>
                    </Button>
                </CardActions>
            </div>
        </Card>
    </Grid>
  );
}