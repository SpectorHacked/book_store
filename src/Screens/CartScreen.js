import React from 'react';
import { Layout } from 'antd';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function CartScreen() {
    return(
        <Box>
            <Grid container>
                <Grid item xs={8}>
                    <Container>
                        <Box m={4}>
                            Items
                        </Box>
                    </Container>
                </Grid>
                <Grid item xs={4}>
                    <Container>
                        <Box m={4}>
                            Checkout
                        </Box>
                    </Container>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CartScreen