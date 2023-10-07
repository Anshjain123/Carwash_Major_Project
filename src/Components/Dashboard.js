import React from 'react'
import car from '../carLogo.png'
import cleaner from '../cleaner_onboarding.jpg'
import client from '../client_onboarding.jpg'
import './Dashboard.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router'



const Dashboard = () => {
    const height = window.innerHeight;


    const navigate = useNavigate(); 
    const handleNavigate = ()=> {
        navigate("/register");
    }

    return (
        <div>
            <div className="container" style={{ display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
                <div className='Car__class' style={{ flex: 0.5, alignContent: 'center' }}>
                    <img class="home_car" src={car} />
                </div>
                <div className='cleaner__client__block' style={{ flexDirection: 'row', display: 'flex', flex: 1, justifyContent: 'space-around' }}>
                    <div className='cleaner__block' style={{ flex: 0.2 }} onClick={()=> handleNavigate()} >  
                        <Card sx={{
                            maxHeight: '250px', maxWidth: '250px', '&:hover': {
                                // backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                            }
                        }} >
                            <CardContent sx={{ maxHeight: '250px', maxWidth: '250px', display: 'flex' }}>
                                <div style={{ flex: 0.8 }}>
                                    <img class="cleaner__car" style={{ maxWidth: '100%' }} src={cleaner} />
                                </div>

                                <div style={{ flex: 0.2, alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '20px', fontWeight: 'bolder' }}>
                                    Cleaner Onboarding
                                </div>
                                {/* <div style={{ flex: 0.1 }}>
                                    <text>
                                    cleaner Onboarding
                                    </text>
                                    
                                </div> */}

                            </CardContent>
                        </Card>

                    </div>
                    <div className='client__block' style={{ flex: 0.2 }}>
                        <Card sx={{
                            maxHeight: '250px', maxWidth: '250px', '&:hover': {
                                // backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                            }
                        }}>
                            <CardContent sx={{ maxHeight: '250px', maxWidth: '250px', display: 'flex' }}>
                                <div style={{ flex: 0.8 }}>

                                    <img class="client__car" src={client} style={{ maxWidth: '100%' }} />
                                </div>
                                <div style={{ flex: 0.2, alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '20px', fontWeight: 'bolder' }}>
                                    Client Onboarding
                                </div>

                            </CardContent>
                        </Card>
                    </div>


                </div>
                <div class="Daily-Car-Wash" style={{ textAlign: 'center' }}>
                    <h1 className='Daily-Car-Wash1'>
                        Complete Car Wash
                    </h1>

                    <hr style={{ color: 'black', height: '1px' }} />

                    <h1 className='Daily-Car-Wash2' style={{ color: 'rgb(239, 63, 73)' }}>
                        At your DoorStep!
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Dashboard