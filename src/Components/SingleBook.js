import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {  Link } from "react-router-dom";
import { LIGHT_COLOR, DARK_COLOR } from '../constants';
import FavoritesIcon from './FavoritesIcon';
import AddShoppingIcon from './AddShoppingIcon';
import InfoIcon from './InfoIcon';

const IMAGE_HEIGHT = 180

export default function SingleBook({item, setCart, cart, setFavorites, favorites, gridSize=4}) {
  const {title, thumbnailUrl, status,  authors, categories, isbn, pageCount, longDescription, shortDescription} = item
  function handleFavoritesClick() {
    const newArray = [...favorites, item]
    console.log(newArray)
    setFavorites(newArray)
  }
  return (
    <Grid item xs={gridSize}>
        <Card sx={{ maxWidth: 350, minHeight: 600, backgroundColor: LIGHT_COLOR }}>
            <CardMedia
                component="img"
                height={IMAGE_HEIGHT}
                image={thumbnailUrl}
                alt={title}
            />
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
            <CardActions sx={{display:'flex', justifyContent:'space-around'}}>
                <Button variant="primary" size="small">
                    <Link to={`book/${isbn}`}>
                        <InfoIcon/>
                    </Link>
                </Button>
                <Button variant="primary" size="small" onClick={() => setCart([...cart, item])}>
                    <AddShoppingIcon/>
                </Button>
                <Button variant="primary" size="small" onClick={() => handleFavoritesClick()}>
                    <FavoritesIcon/>
                </Button>
            </CardActions>
        </Card>
    </Grid>
  );
}