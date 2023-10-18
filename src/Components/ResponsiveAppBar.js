import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router';
import cleaner from '../cleaner_onboarding.jpg'
import client from '../client_onboarding.jpg'
import './Dashboard.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


function ResponsiveAppBar() {

    const navigate = useNavigate();

    return (
        <AppBar position="static" sx={{ backgroundColor: 'black', position: 'fixed', top: '0', width: '100%'}} >
            <Container maxWidth="xl">
                <Toolbar disableGutters  >
                    <div style={{ flexDirection: 'row', display: 'flex', flex: 0.2, justifyContent:'space-around'}}>
                        <div style = {{cursor:'pointer', marginRight:'10px'}} onClick={() => navigate("/cleaners")} >
                            <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '20px', fontWeight: 'bolder' }}>
                                Cleaners
                            </div>
                        </div>
                        <div style={{ cursor:'pointer', marginRight:'10px' }} onClick={() => navigate("/clients")} >
                            <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '20px', fontWeight: 'bolder' }}>
                                Clients
                            </div>
                        </div>
                        <div style={{ cursor:'pointer', marginRight:'10px' }} onClick={() => navigate("/")} >
                            <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '20px', fontWeight: 'bolder' }}>
                                Home
                            </div>
                        </div>
                    </div>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;