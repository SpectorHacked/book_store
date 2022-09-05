import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import SingleBook from '../Components/SingleBook';
import Box from '@mui/material/Box';
import CategoriesFilter from '../Components/CategoriesFilter';
import axios from 'axios';


export default function BestSellersScreen({favorites, setFavorites, cart, setCart}) {
    const [data, setData] = useState([])
    const [currentCategory, setCurrentCategory] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            try {
                if(currentCategory.length) {
                    const res = await axios.get('/best-sellers',{ params: {currentCategory: currentCategory}})
                    setData(res.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        };
        getProducts();
    }, [currentCategory])



    return(
        <Box m={10} sx={{ flexGrow: 1 }}>
            <Container fixed sx={{marginBottom: 10}}>
                <CategoriesFilter setCurrentCategory={setCurrentCategory} currentCategory={currentCategory} fullWidth />
            </Container>
            <Stack direction={{ xs: "column", xwsm: "row" }} spacing={2}>
                <Grid container spacing={2}>
                    {data.map((singleBook, i) => <SingleBook isFavorite={favorites.includes(singleBook)} gridSize={3} key={i.toString()} favorites={favorites} setFavorites={setFavorites} cart={cart} setCart={setCart} item={singleBook}/>)}
                </Grid>
            </Stack>
        </Box>
      )
}