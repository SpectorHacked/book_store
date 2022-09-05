import React, { useState, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { getDataFromServer } from '../App';

const CategoriesFilter = ({setCurrentCategory,currentCategory}) => {
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
    <FormControl sx={{ width: '100%', height:'100%', backgroundColor: "#E9E2CF"}}>
      <InputLabel id="demo-multiple-name-label">Categories</InputLabel>
      <Select
          input={<OutlinedInput label="Categories" />}
          value={currentCategory}
          onChange={(e) => handleChange(e.target.value)}
        >
          {options.map((e) => (
            <MenuItem
              key={e}
              value={e}
            >
              {e}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
	);
};


export default CategoriesFilter;

