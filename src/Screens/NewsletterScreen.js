import React, { useState, useEffect } from 'react';
import { Box, Container, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { centerObjectCSS } from '../constants';

export default function Newsletter({}) {
    const [email, setEmail] = useState("")
    const [showToast, setShowToast] = useState(false)
    const handleAddSubmit = async() => {
        try {
            const res = await axios.get('/Newsletter', { params: { email } })
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
            <h1 style={{ flex: 1, textAlign: "center",color: "#5A7262", fontSize: 75}}>Newsletter</h1>
            <p style={{ flex: 1, textAlign: "center",color: "#5A7262", fontSize: 30}}>Get updates on all our special offers and recommendations...</p>
            <Box m={4} sx={{ flexGrow: 1 }}>
                <TextField sx={{width:"100%"}}  variant="outlined" value={email} label={"Email"} onChange={(e) => setEmail(e.target.value)}/>
            </Box>
            <div style={{...centerObjectCSS}}>
                <Button variant="contained" sx={{margin: 2, color: "#5A7262", backgroundColor: "#E9E2CF" }} onClick={() => handleAddSubmit()}>
                    Join our Newsletter!
                </Button>
            </div>
            <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'center'}} open={showToast} autoHideDuration={3000} onClose={() => setShowToast(false)}>
                <MuiAlert onClose={() => setShowToast(false)} severity="success" sx={{ width: '100%' }}>
                    Successfully added to our Newsletter!
                </MuiAlert>
            </Snackbar>
        </Container>
      )
}