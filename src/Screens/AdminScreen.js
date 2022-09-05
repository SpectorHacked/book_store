import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid, Paper, TextField, Tooltip } from '@mui/material';
import { ADMIN_ITEM_SKELETON, ADMIN_TITLES, centerObjectCSS, DARK_COLOR } from '../constants';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Info from '@mui/icons-material/Info';
import { normalizeBook } from '../functions';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function AdminScreen({user}) {
    if(!user?.isAdmin) {
        return <div>Your not authorized!</div>
    }
    const [showToast, setShowToast] = useState(false)
    const [newBook, setNewBookValues] = useState(ADMIN_ITEM_SKELETON)
    const [deleteId, setDeleteId] = useState("")
    const [activity, setActivity] = useState([])

    const handleChange = (key, newValue) => {
        setNewBookValues({...newBook, [key]: newValue})
    }

    const handleAddSubmit = async() => {
        try {
            const res = await axios.get('/admin-add-items', {params: {item: normalizeBook(newBook)}})
            if(res.status == 200) {
                setShowToast(true)
                setNewBookValues(ADMIN_ITEM_SKELETON)
            } else {
                alert("Something went wrong")
            }
        } catch(e) {
            console.log(e)
            alert("Something went wrong")
        }
    }

    const handleDeleteSubmit = async() => {
        try {
            const res = await axios.get('/admin-remove-item', { params: {isbn: deleteId} })
            if(res.status == 200) {
                setShowToast(true)
                setDeleteId("")
            } else {
                alert("Wrong isbn")
            }
        } catch(e) {
            console.log(e)
            alert("Something went wrong")
        }
    }
    useEffect(() => {
        const getActivityFromServer = async () => {
              const res = await axios.get('/admin-get-activities')
              setActivity(res.data.data)
        }
        getActivityFromServer();
      }, []);

    return(
        <Grid container sx={{display:'flex', margin: 10}}>
            <Grid item xs={6} sx={{...centerObjectCSS, flexDirection:'row'}}>
                <Paper elevation={2} sx={{...centerObjectCSS, flexDirection:'column', width:'80%', margin: 2}}>
                    {Object.keys(newBook).map(preset => {
                        return(
                            <FieldInput key={preset.toString()} path={preset} label={ADMIN_TITLES[preset]} value={newBook[preset]} handleChange={handleChange}/>
                        )
                    })}
                    <Button variant="contained" sx={{margin: 2}} onClick={() => handleAddSubmit()}>
                        Add new Item
                    </Button>
                </Paper>
                <Paper elevation={2} sx={{...centerObjectCSS, flexDirection:'column', width:'80%', height:572, margin: 2}}>
                    <TextField sx={{width:"90%"}} variant="outlined" value={deleteId} label={"isbn to delete"} onChange={(e) => setDeleteId(e.target.value)}/>
                    <Button variant="contained" sx={{margin: 2}} onClick={() => handleDeleteSubmit()}>
                        Delete Item
                    </Button>
                </Paper>
            </Grid>
            <Grid item xs={6} sx={centerObjectCSS}>
                <Paper elevation={2} sx={{...centerObjectCSS, flexDirection:'column', width:'80%'}}>
                    <Typography variant="h4">Activity</Typography>
                    <ActivityTable data={activity}/>
                </Paper>
            </Grid>
            <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'center'}} open={showToast} autoHideDuration={3000} onClose={() => setShowToast(false)}>
                <MuiAlert onClose={() => setShowToast(false)} severity="success" sx={{ width: '100%' }}>
                    Successfully added item to shop!
                </MuiAlert>
            </Snackbar>
        </Grid>
      )
}

function FieldInput({handleChange, label, value, path}) {
    return(
        <Box sx={{margin: 1, width:"80%", ...centerObjectCSS}}>
            {Array.isArray(value) ? 
                <div style={{...centerObjectCSS, flexDirection:'row', width:'100%' }}>
                    <TextField sx={{width:"100%"}} variant="outlined" value={value} label={label} onChange={(e) => handleChange(path ,e.target.value)}/>
                    <Tooltip title={'Add mupltiple by "," without spaces'}>
                        <Info sx={{color: DARK_COLOR, marginLeft: 2}}/>
                    </Tooltip>
                </div>
                :    
                <TextField sx={{width:"100%"}}  variant="outlined" value={value} label={label} onChange={(e) => handleChange(path ,e.target.value)}/>
        }
        </Box>
    )
}

function ActivityTable({data}) {
    return(
        // <DataGrid
        //     rows={data}
        //     columns={columns}
        //     rowsPerPageOptions={10}
        // />
        <div>Table</div>
    )
} 