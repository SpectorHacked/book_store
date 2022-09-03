import React from 'react'
import Favorites from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import { DARK_COLOR, LIGHT_COLOR } from '../constants';

const FavoritesIcon = (props) => {
	return (
		<Avatar sx={{backgroundColor:LIGHT_COLOR}}>
			<Favorites sx={{color: DARK_COLOR}}/>
		</Avatar>
	);
};



export default FavoritesIcon;