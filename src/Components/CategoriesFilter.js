import React, { useState, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { getDataFromServer } from '../App';

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

const CategoriesFilter = ({setCurrentCategory, categories}) => {
  const [options, setOptions] = useState([])

  const handleChange = (value) => {
    setCurrentCategory([value])
  };

  useEffect(() => {
    const getCategories = async() => {
      const res = await getDataFromServer('/categories')
      if(res.data.data) {
        setOptions(res.data.data)
      }
    }
    getCategories()
  }, [])

  if(!options.length) return;

	return (
    <FormControl sx={{ width: '100%', height:'100%' }}>
      <InputLabel id="demo-multiple-name-label">Categories</InputLabel>
      <Select
          input={<OutlinedInput label="Categories" />}
          value={categories}
          onChange={(e) => handleChange(e.target.value)}
        >
          {options.map((e) => (
            <MenuItem
              key={e}
              value={e}
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

