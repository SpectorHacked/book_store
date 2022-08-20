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

export default function StoreScreen() {
    const [searchInput, setSearchInput] = useState("")
    const [page, setPage] = useState(1);

    return(
      <Container fixed>
        <Box m={4}>
          <TextField 
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} label="Search" sx={{ width: '100%' }}/>
        </Box>
        <Data search={searchInput} filters={{}}/>
        <PaginationControl page={page} setPage={setPage}/>
      </Container>
    )
}

function Data({search, filters}) {
  const [data, setData] = useState([])
  useEffect(() => {
    const searchProduct = async () => {
      try {
        const res = await getDataFromServer('/search',{filters: filters, search: search})
        setData(res)
        } catch (error) {
          console.log(error)
         }
        };
         searchProduct();
  }, [search]);
  return(
    <Box m={4} sx={{ flexGrow: 1 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Grid container spacing={2}>
          {data.map(singleBook => <SingleBook item={singleBook}/>)}
        </Grid>
      </Stack>
    </Box>
  )
}

function PaginationControl({page, setPage}) {
  return(
    <Box m={4}>
      <Container sx={{justifyContent:'center', display:'flex'}}>
        <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
          <Pagination count={10} page={page} onChange={(e, value) => setPage(value)} />
        </Stack>
      </Container>
  </Box>
    
  )
}