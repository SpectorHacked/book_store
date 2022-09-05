import React from 'react'
import Info from '@mui/icons-material/Info';
import Avatar from '@mui/material/Avatar';
import { DARK_COLOR, LIGHT_COLOR } from '../constants';

const InfoIcon = () => {
	return (
		<Avatar sx={{backgroundColor:LIGHT_COLOR}}>
			<Info sx={{color: DARK_COLOR}}/>
		</Avatar>
	);
};



export default InfoIcon;