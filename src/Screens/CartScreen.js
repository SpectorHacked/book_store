import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Divider } from '@mui/material';
import { DARK_COLOR, LIGHT_COLOR } from '../constants';


function CartScreen({cart}) {
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        const price = cart.map(item => item?.pageCount)
        if(cart.length) {
            setTotalPrice(price.reduce((prev, next) => prev + next))
        }
    },[cart])

    return(
        <Box>
            <Paper>
                <Grid container>
                    <Grid item xs={8}>
                        <Box display={"flex"} justifyContent="center" flexDirection={'column'} alignItems="center">
                            {cart.map((e, i) => <SingleItem key={i.toString()} item={e}/>)}
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box>
                            <Paper elevation={3} sx={{display:'flex', justifyContent:'center', alignItems:'center',maxWidth: 500, marginTop: 2, marginBottom: 2}}>
                                <Checkout items={cart} totalPrice={totalPrice}/>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

function Checkout({totalPrice, items}) {
    return(
        <Card sx={{width:"100%", backgroundColor:LIGHT_COLOR, minHeight: 200}}>
            <div style={{marginLeft: 4, marginTop: 10, marginBottom: 10}}>
                <b style={{fontSize: 23, color:'black'}}>Checkout</b>
            </div>
            <Divider sx={{marginBottom: 1}}/>
            {items.map((e, i) => {
                return(
                    <div key={i.toString()} style={{margin: 4, display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <b style={{fontSize: 15, color: DARK_COLOR}}>{e.title}</b>
                        <Typography sx={{color:'gray'}}>{e.pageCount}$</Typography>
                    </div>
                )
            })}
            <Divider sx={{marginBottom: 1, marginTop: 1}}/>
            <div style={{margin: 4, display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <b style={{fontSize: 16, color: 'black'}}>Total</b>
                <Typography sx={{color:'gray', fontSize: 23}}>{totalPrice}$</Typography>
            </div>
        </Card>
    )
}
function SingleItem({item}) {
    const {title, thumbnailUrl, status,  authors, categories, isbn, pageCount, longDescription, shortDescription} = item
    return(
        <Card sx={{ minWidth: 680,maxWidth: 900, display:'flex', flexDirection:'row', backgroundColor: LIGHT_COLOR, margin: 2 }}>
            <div style={{ display: "flex", alignItem: "center", justifyContent: "center"}}>
            <CardMedia
                component="img"
                he
                image={thumbnailUrl}
                alt={title}
                />
            </div>  
            <CardContent style={{width: 700}}>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2">
                    {shortDescription}
                </Typography>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <Typography variant="h6">
                        Price: {pageCount}$
                    </Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default CartScreen