import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Divider } from '@mui/material';
import { centerObjectCSS, DARK_COLOR, LIGHT_COLOR } from '../constants';
import RemoveIcon from '../Components/RemoveIcon';
import axios from 'axios';


function CartScreen({cart, setCart, user}) {
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        const price = cart.map(item => item?.pageCount)
        if(cart.length) {
            setTotalPrice(price.reduce((prev, next) => prev + next))
        } else {
            setTotalPrice(0)
        }
    },[cart])

    function removeFromCart(index) {
        cart.splice(index, 1)
        const newCart = [...cart]
        setCart(newCart, false)
    }

    async function handleCartBuy() {
        try {
            const res = await axios.get('/submit-purchase', {params: { cart, userId: user.id }})
            if(res.status == 200) {
                alert("Your order is on the way")
                setCart([])
            } else {
                alert("Something went wrong")
            }
        } catch(e) {
            console.log(e)
            alert("Something went wrong")
        }
    }
    return(
        <Box>
            <Paper style={{paddingBottom: 50}}>
                <Grid container>
                    <Grid item xs={8}>
                        <Box display={"flex"} justifyContent="center" flexDirection={'column'} alignItems="center">
                            {cart.map((e, i) => <SingleItem index={i} removeFromCart={removeFromCart} key={i.toString()} item={e}/>)}
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} sx={{display:'flex', justifyContent:'center', alignItems:'center',maxWidth: 500, marginTop: 2,height:'100%'}}>
                            <Checkout handleCartBuy={handleCartBuy} items={cart} totalPrice={totalPrice}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

function Checkout({totalPrice, items, handleCartBuy}) {
    return(
        <Card sx={{width:"100%", backgroundColor:LIGHT_COLOR, minHeight: 100, height:'100%'}}>
            <div style={{marginLeft: 4, marginTop: 10, marginBottom: 5}}>
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
            <div style={{...centerObjectCSS}}>
                <Button sx={{backgroundColor:'green'}} variant="contained" onClick={() => handleCartBuy()}>
                        Buy
                </Button>
            </div>
        </Card>
    )
}
function SingleItem({item, removeFromCart, index}) {
    const {title, thumbnailUrl, status,  authors, categories, isbn, pageCount, longDescription, shortDescription} = item
    return(
        <Card sx={{ minWidth: 680,maxWidth: 900, display:'flex', flexDirection:'row', backgroundColor: LIGHT_COLOR, margin: 2 }}>
            <div style={{ display: "flex", alignItem: "center", justifyContent: "center"}}>
            <CardMedia
                component="img"
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
                <div style={{display:'flex', justifyContent:'flex-end', flexDirection:'row'}}>
                    <Typography variant="h6">
                        Price: {pageCount}$
                    </Typography>
                    <Button onClick={() => removeFromCart(index)}>
                        <RemoveIcon/>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default CartScreen