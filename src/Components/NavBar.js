import * as React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';


const HEADER_HEIGHT = 150
const CART_ICON_SIZE = 80
const Options = [
    {label:'Home',key:'Home', },
    {label:'Best Fit',key:'Best Fit', },
    {label:'Join Newsletter', key:'Join Newsletter'}, 
    {label:'Favorites',key:'Favorites' },
    {label:'On Sales',key:'Sales' },
]
function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div style={{ height:HEADER_HEIGHT, width:'100wh', backgroundColor:'#5a7262', display:'flex', justifyContent:'space-between' }}>
      <div style={{margin: 10, flexDirection:'row', display:'flex', flex: 6, justifyContent:'space-around', alignItems:'center'}}>
            {Options.map(e => {
            return(
            <Button
              variant="contained"
              style={{textTransform:'none', height: 60}}
              onClick={handleClick}>
                  {e.label}
            </Button>)
            })}
      </div>
      <div style={{margin: 10, display:'flex', flex: 1, justifyContent:'center', alignItems:'center'}}>
        <Avatar>
          <ShoppingCartOutlined sx={{ width: 56, height: 56 }}/>
        </Avatar>
      </div>
    </div>
  );
};
export default NavBar;