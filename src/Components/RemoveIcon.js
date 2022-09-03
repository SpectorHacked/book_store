import React from 'react'
import Delete from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import { DARK_COLOR, LIGHT_COLOR } from '../constants';

const RemoveIcon = (props) => {
	return (
		<Avatar sx={{backgroundColor:LIGHT_COLOR}}>
			<Delete sx={{color: DARK_COLOR}}/>
		</Avatar>
	);
};



export default RemoveIcon;