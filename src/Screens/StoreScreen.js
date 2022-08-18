import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import SingleBook from '../Components/SingleBook';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function StoreScreen({data}) {
    return(
      <Container fixed>
        <Box m={4} sx={{ flexGrow: 1 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Grid container spacing={2}>
              {data.map(singleBook => <SingleBook item={singleBook}/>)}
            </Grid>
              {/* <Grid item xs={4}>
                <Item>xs=4</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>xs=4</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>xs=4</Item>
              </Grid> */}
          </Stack>
        </Box>
      </Container>
    )
}
