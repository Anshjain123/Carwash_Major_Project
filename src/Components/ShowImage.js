import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import "./ShowImage.css"

const ShowImage = ({ url }) => {
    console.log(url);
    return (
        <div style={{ padding: "10px", flex: "1" }}>

            <Card sx={{ flex: "1"}}>
                <CardMedia
                    sx={{ height: "450px", objectFit:'contain' }}
                    image={url}
                />
            </Card>
        </div>
    )
}

export default ShowImage