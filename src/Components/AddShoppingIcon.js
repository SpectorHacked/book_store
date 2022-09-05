import React from 'react'
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import Avatar from '@mui/material/Avatar';
import { DARK_COLOR, LIGHT_COLOR } from '../constants';

const AddShoppingIcon = () => {
	return (
		<Avatar sx={{backgroundColor:LIGHT_COLOR}}>
			<AddShoppingCart sx={{color: DARK_COLOR}}/>
		</Avatar>
	);
};

export default AddShoppingIcon;

