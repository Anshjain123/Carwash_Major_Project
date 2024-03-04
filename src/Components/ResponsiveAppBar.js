import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import "./ResponsiveAppBar.css"
import './Dashboard.css'
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

function ResponsiveAppBar() {

    const navigate = useNavigate();



    return (
        // <div position="static" sx={{ backgroundColor: 'black', position: 'fixed', top: '0', width: '100%', padding: "40px",}} >
        //     <div maxWidth="xl">
        //         <div disableGutters  >
        //             <div style={{ flexDirection: 'row', display: 'flex', flex: 0.3, justifyContent:'space-around'}}>
        // <div style = {{cursor:'pointer', marginRight:'10px'}} onClick={() => navigate("/cleaners")} >
        //     <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '20px', fontWeight: 'bolder' }}>
        //         Cleaners
        //     </div>
        // </div>
        // <div style={{ cursor:'pointer', marginRight:'10px' }} onClick={() => navigate("/clients")} >
        //     <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '20px', fontWeight: 'bolder' }}>
        //         Clients
        //     </div>
        // </div>
        // <div style={{ cursor:'pointer', marginRight:'10px' }} onClick={() => navigate("/")} >
        //     <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '20px', fontWeight: 'bolder' }}>
        //         Home
        //     </div>
        // </div>

        // <div style={{ cursor:'pointer', marginRight:'10px' }} onClick={() => navigate("/mapcleaners")} >
        //     <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '20px', fontWeight: 'bolder' }}>
        //         Assign Cleaners
        //     </div>
        // </div>
        //             </div>

        //         </div>
        //     </div>
        // </div>
        <div className='AppBar' >
            <nav>
                <ul>
            {/* <em class="tag">Washify</em> */}
                    <li onClick={() => navigate("/")}>
                        <a href="#">Home</a>
                    </li>
                    <li onClick={() => navigate("/cleaners")}>
                        <a href="#">Cleaners</a>
                    </li>
                    <li onClick={() => navigate("/clients")}>
                        <a href="#">Clients</a>
                    </li>
                    <li onClick={() => navigate("/mapcleaners")}>
                        <a href="#">Assign Cleaners</a>
                    </li>
                    <li onClick={() => navigate("/getImagesDayWise")}>
                        <a href="#">Get images day wise</a>
                    </li>
                </ul>
            </nav>
        </div>


    );
}
export default ResponsiveAppBar;