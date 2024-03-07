import React, { useState } from 'react'
import "./GetImagesDayWise.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Toaster, toast } from 'react-hot-toast';
import ShowImage from './ShowImage';


const GetImagesDayWise = () => {


    const [carNumber, setcarNumber] = useState("");
    const [date, setdate] = useState("");
    const [allUrls, setallUrls] = useState([]);


    const handleSubmit = async () => {

        if (carNumber == "" || date == "") {
            toast.error("fields are empty!");
            return;
        }
        const data = {
            carNumber: carNumber,
            date: date
        }

        
        let response = await fetch("http://localhost:8080/admin/getUrlsByDateAndCarNumber", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),

        })

        try {
            let res = await response.json();
            console.log(res);
            setallUrls(res);
            toast.success("fetched images succefully!");
        } catch (error) {
            console.log(error);
            toast.error("cannot fetched images! may be images are not uploaded for this day");
        }
    }

    return (

        <div className='getimagesdaywise'>
            <Toaster />
            <div className='container'>

                <div className='query'>
                    <div>
                        <div className='carnumber' >
                            <TextField id="standard-basic" label="Car number" variant="standard" value={carNumber} onChange={(e) => setcarNumber(e.target.value)} sx={{ width: '100%' }} required />
                        </div>
                        <div className='date'>
                            <TextField value={date} id="standard-basic" label="Date (dd-mm-yyyy)" variant="standard" type='date' onChange={(e) => setdate(e.target.value)} sx={{ width: '100%' }} required />
                        </div>
                    </div>

                    <div className="button">
                        <Button variant="contained" onClick={handleSubmit} >Submit</Button>
                    </div>
                </div>
                <div className='images'>
                    {allUrls.length > 0 && allUrls.map((url, index) => {
                        return <ShowImage className="image" url={url}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default GetImagesDayWise