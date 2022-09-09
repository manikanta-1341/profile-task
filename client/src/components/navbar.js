import { AppBar, Button, Toolbar, Box, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'


export default function Navbar() {
    const nav = useNavigate()
    const Logout =()=>{
        window.sessionStorage.removeItem('token')
        nav('/')
    }
    return (
        <Box>
            <AppBar sx={{ zIndex: 0, position: "static" }}>
                <Toolbar sx={{justifyContent:"space-between"}}>
                        <Typography sx={{fontSize:"1.5rem"}}>Profile</Typography>
                        <Button sx={{ color: "white" }} onClick={() =>Logout()}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}