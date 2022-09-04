import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import SingleBook from '../Components/SingleBook';
import Box from '@mui/material/Box';
import { getDataFromServer } from '../App';
import CategoriesFilter from '../Components/CategoriesFilter';


export default function BestSellersScreen({favorites, setFavorites, cart, setCart}) {
    const [data, setData] = useState([])
    const [currentCategory, setCurrentCategory] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            try {
                if(currentCategory.length) {
                    const res = await getDataFromServer('/best-sellers',{ params: {currentCategory}})
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
                <Grid container m={10}>
                    <Grid item xs={9}>
                        <CategoriesFilter setCurrentCategory={setCurrentCategory} fullWidth />
                    </Grid>
                </Grid>
                <Stack direction={{ xs: "column", xwsm: "row" }} spacing={2}>
                    <Grid container spacing={2}>
                        {data.map((singleBook, i) => <SingleBook gridSize={3} key={i.toString()} favorites={favorites} setFavorites={setFavorites} cart={cart} setCart={setCart} item={singleBook}/>)}
                    </Grid>
                </Stack>
            </Box>
      )
}