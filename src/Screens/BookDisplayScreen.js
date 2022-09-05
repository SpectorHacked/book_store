import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useParams } from 'react-router-dom';
import { getDataFromServer } from '../App';
import { Typography } from 'antd';
import FavoritesIcon from '../Components/FavoritesIcon';
import AddShoppingIcon from '../Components/AddShoppingIcon';

function BookDisplayScreen({favorites, setFavorites}) {
    const params = useParams()
    const [item, setItem] = useState()
    useEffect(() => {
        const searchProduct = async () => {
            try {
                const isbn = params.isbn
                const res = await getDataFromServer('/get_one_by_isbn', { isbn })
                setItem(res.data.data)
            } catch (error) {
                console.log(error)
                }
            };
            searchProduct();
        }, []);     

    if(!item) return;
    return(
        <Box>
            <Grid container sx={{display:'flex', justifyContent:'center', marginTop: 7}}>
                <Grid item xs={9}>
                    <Card sx>
                        <div
                            style={{...centerObjectCSS}}
                        >
                        <CardMedia
                            style={{maxWidth: 500}}
                            component="img"
                            height={500}
                            width={500}
                            image={item?.thumbnailUrl}
                            alt={item?.title}
                        />
                        </div>
                        <CardContent>
                            <div style={{flexDirection:'row', display:'flex', justifyContent:'space-between', alignItems: 'center', marginTop: 10, marginBottom: 20}}>
                                <Typography>
                                    {item?.title}
                                </Typography>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <Button sx={{textTransform:'none'}}>
                                        <AddShoppingIcon/>
                                    </Button>
                                    <Button onClick={() => setFavorites([...favorites, item])} sx={{textTransform:'none'}}>
                                        <FavoritesIcon/>
                                    </Button>
                                </div>
                            </div>
                            <Line title={"Authors"} array={item?.authors}/>
                            <Line title={"Categories"} array={item?.categories}/>
                            <div key={"title"} style={{margin: 2}}>
                                <div style={{marginBottom: 16}}>
                                    <b>Description</b>
                                </div>
                                <Typography variant="body2" color="text.secondary">
                                    {item?.longDescription}
                                </Typography>
                            </div>

                            <div style={{margin: 4, display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
                                <b style={{fontSize: 18}}>
                                    Price: {item?.pageCount}$
                                </b>
                            </div>
                            
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}
function Line({title, array}) {
    return(
        <div key={"title"} style={{margin: 2}}>
            <b>{title}</b>
            <div style={{display:'flex', flexDirection:'row', margin: 2}}>
                {array.map((e,i) => <Button key={i.toString()} style={{margin: 3, textTransform:'none'}}>{e}</Button>) }
            </div>
        </div>
    )
}
export default BookDisplayScreen;