import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import SingleBook from '../Components/SingleBook';
import Box from '@mui/material/Box';


export default function FavoritesScreen({favorites, setFavorites, cart, setCart}) {
    return(
        <Container fixed>
            <h1 style={{ flex: 1, textAlign: "center",color: "#5A7262", fontSize: 75}}>Favorites</h1>
            <Box m={4} sx={{ flexGrow: 1 }}>
                <Stack direction={{ xs: "column", xwsm: "row" }} spacing={2}>
                    <Grid container spacing={2}>
                        {favorites.map((singleBook, i) => <SingleBook isFavorite={true} key={i.toString()} favorites={favorites} setFavorites={setFavorites} cart={cart} setCart={setCart} item={singleBook}/>)}
                    </Grid>
                </Stack>
            </Box>
        </Container>
      )
}