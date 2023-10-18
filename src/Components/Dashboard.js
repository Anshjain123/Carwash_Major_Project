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

    return (


        <div className="container" style={{ display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'column' }}>

            <div class="Daily-Car-Wash" style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }} >
                        <h1 className='text1' style={{ fontSize: '40px', fontWeight: 'bolder', color: 'black' }}>
                            Complete Car Wash
                        </h1>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', color: 'black' }}>
                            <h4>
                                S t a r t s
                            </h4>
                            <h4>
                                f r o m
                            </h4>
                            <h4>
                                j u s t
                            </h4>
                        </div>

                    </div>
                    <div>

                        <h1 style={{ fontSize: '70px', marginLeft: "20px", marginTop: "-5px", color: 'black' }} >$9</h1>
                    </div>
                </div>



                <hr style={{ color: 'black', height: '1px' }} />

                <h1 className='text2' style={{ color: 'rgb(239, 63, 73)' }}>
                    At your DoorStep!
                </h1>
            </div>

            <div className='Car__class' style={{ flex: 0.5, alignContent: 'center' }}>
                <img class="home_car" src={car} />
            </div>


        </div>

    )
}

export default Dashboard