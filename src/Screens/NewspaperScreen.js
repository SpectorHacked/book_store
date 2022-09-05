import React, { useState, useEffect } from 'react';
import { Box, Container, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { centerObjectCSS } from '../constants';

export default function NewspaperScreen({}) {
    const [email, setEmail] = useState("")
    const [showToast, setShowToast] = useState(false)
    const handleAddSubmit = async() => {
        try {
            const res = await axios.get('/newspaper-add', { params: { email } })
            if(res.status == 200) {
                setShowToast(true)
                setEmail("")
            } else {
                alert("Something went wrong")
            }
        } catch(e) {
            console.log(e)
            alert("Something went wrong")
        }
    }
    return(
        <Container fixed>
            <h1 style={{ flex: 1, textAlign: "center", fontSize: 75}}>Newspaper</h1>
            <Box m={4} sx={{ flexGrow: 1 }}>
                <TextField sx={{width:"100%"}}  variant="outlined" value={email} label={"Email"} onChange={(e) => setEmail(e.target.value)}/>
            </Box>
            <div style={{...centerObjectCSS}}>
                <Button variant="contained" sx={{margin: 2}} onClick={() => handleAddSubmit()}>
                    Join to the news paper
                </Button>
            </div>
            <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'center'}} open={showToast} autoHideDuration={3000} onClose={() => setShowToast(false)}>
                <MuiAlert onClose={() => setShowToast(false)} severity="success" sx={{ width: '100%' }}>
                    Successfully added item to shop!
                </MuiAlert>
            </Snackbar>
        </Container>
      )
}