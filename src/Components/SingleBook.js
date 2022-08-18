import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const IMAGE_HEIGHT = 180

export default function SingleBook({item}) {
  const {title, thumbnailUrl, status,  authors, categories, isbn, pageCount, longDescription, shortDescription} = item
  return (
    <Grid item xs={4}>
        <Card sx={{ maxWidth: 345, height: 480 }}>
            <CardMedia
                component="img"
                height={IMAGE_HEIGHT}
                image={thumbnailUrl}
                alt={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {shortDescription}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">More info</Button>
            </CardActions>
        </Card>
    </Grid>
  );
}