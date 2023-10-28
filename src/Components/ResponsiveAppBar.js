import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import './Dashboard.css'


function ResponsiveAppBar() {

    const navigate = useNavigate();

    return (
        <AppBar position="static" sx={{ backgroundColor: 'black', position: 'fixed', top: '0', width: '100%'}} >
            <Container maxWidth="xl">
                <Toolbar disableGutters  >
                    <div style={{ flexDirection: 'row', display: 'flex', flex: 0.3, justifyContent:'space-around'}}>
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

                        <div style={{ cursor:'pointer', marginRight:'10px' }} onClick={() => navigate("/mapcleaners")} >
                            <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '20px', fontWeight: 'bolder' }}>
                                Assign Cleaners
                            </div>
                        </div>
                    </div>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;