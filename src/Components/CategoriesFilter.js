import React, { useState } from 'react'
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import Avatar from '@mui/material/Avatar';
import { DARK_COLOR, LIGHT_COLOR } from '../constants';
import { Autocomplete } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';

function getStyles(name, categories, theme) {
  return {
    fontWeight:
        categories.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const filterMockup = {
//   'status': ['MEAP'],
//   'categories': ['Java']
// }


const CategoriesFilter = ({options, setFilters}) => {
  if(!options.length) return;
  
  const theme = useTheme();
  const [categories, setCategories] = useState([]);
  const handleChange = (value) => {
    console.log(value)
    const newValue = typeof value === 'string' ? value.split(',') : value
    if(newValue.length) {
      setCategories(newValue)
      setFilters({ 'categories': newValue})
    } else {
      setCategories([])
      setFilters({})
    }
  };
	return (
    <FormControl sx={{ width: '100%', height:'100%' }}>
      <InputLabel id="demo-multiple-name-label">Categories</InputLabel>
      <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          input={<OutlinedInput label="Categories" />}
          value={categories}
          onChange={(e) => handleChange(e.target.value)}
        >
          {options.map((e) => (
            <MenuItem
              key={e}
              value={e}
              style={getStyles(e, categories, theme)}
              MenuProps={MenuProps}
            >
              {e}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
	);
};


export default CategoriesFilter;

