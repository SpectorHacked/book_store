import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import SingleBook from '../Components/SingleBook';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { getDataFromServer } from '../App';
import Pagination from '@mui/material/Pagination';
import { centerObjectCSS, LIGHT_COLOR } from '../constants';

export default function StoreScreen({setCart, cart, favorites, setFavorites}) {
    const [searchInput, setSearchInput] = useState("")
    const [page, setPage] = useState(1);
    const [resultsLength, setResultsLength] = useState(0)
    const [skip, setSkip] = useState(0);

    return(
      <Container fixed>
        <Box m={4}>
          <TextField 
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} label="Search" sx={{ width: '100%', backgroundColor: LIGHT_COLOR }}/>
        </Box>
        <Data setFavorites={setFavorites} favorites={favorites} cart={cart} setCart={setCart} setSkip={setSkip} setResultsLength={setResultsLength} page={page} skip={skip} search={searchInput} />
        <PaginationControl page={page} resultsLength={resultsLength} setPage={setPage}/>
      </Container>
    )
}

function Data({search,  page, skip, cart, setCart, setResultsLength, setSkip, favorites, setFavorites}) {
  const [data, setData] = useState([])
    
  useEffect(() => {
    const searchProduct = async () => {
      try {
          const res = await getDataFromServer('/search',{filters: {}, search, skip})
          if(Array.isArray(res.data.data)) {
            setData(res.data.data)
            setResultsLength(res.data.resultsLength)
            if(res.data.resultsLength > 9) {
              setSkip(res.data.skip)
            } else {
              setSkip(0)
            }
          } else {
            setData([])
            setResultsLength(0)
            setSkip(0)
          }
        } catch (error) {
          console.log(error)
         }
        };
         searchProduct();
  }, [search, page]);

  return(
    <Box m={4} sx={{ flexGrow: 1 }}>
      <Stack direction={{ xs: "column", xwsm: "row" }} spacing={2}>
        <Grid sx={{...centerObjectCSS}} container spacing={2}>
          {data.map((singleBook, i) => <SingleBook isFavorite={favorites.includes(singleBook)} key={i.toString()} setFavorites={setFavorites} favorites={favorites} cart={cart} setCart={setCart} item={singleBook}/>)}
        </Grid>
      </Stack>
    </Box>
  )
}

function PaginationControl({page, setPage, resultsLength}) {
  return(
    <Box m={4}>
      <Container sx={{...centerObjectCSS}}>
        <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
          <Pagination count={Math.round(resultsLength/9)} page={page} onChange={(e, value) => setPage(value)} />
        </Stack>
      </Container>
    </Box>
    
  )
}