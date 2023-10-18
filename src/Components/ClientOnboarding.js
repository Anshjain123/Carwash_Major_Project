import React, { useState } from "react";
import { Button, TextField, FormControl, Box, InputLabel, NativeSelect } from "@mui/material";
import './ClientOnboarding.css'
// import { Route, Router, Routes } from "react-router-dom";
// import ClientInfo from "./Components/Client_info";
// import AllClient from "./Components/All_Client";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useLocation, useNavigate } from "react-router";
import { Toaster, toast } from "react-hot-toast";



function ClientOnboarding() {

    // const [Data, setData] = useState({ fullName: "", age: "", address: "", gender: "male" });
    const navigate = useNavigate();
    const location = useLocation();
    const [FullName, setFullName] = useState(location?.state?.name);
    const [age, setage] = useState(location?.state?.age);
    const [address, setaddress] = useState(location?.state?.address);
    const [gender, setgender] = useState(location?.state?.gender)
    const [PhoneNumber, setPhoneNumber] = useState(location?.state?.phoneNumber);
    // const ChangeData = (e) => {
    //     const { name, value } = e.target;
    //     setData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    // }
    // const SubmitData = () => {
    //     console.log(Data);
    // }
    // 

    const handleNext = () => {

        if(FullName === undefined || age === undefined || address === undefined || gender === undefined || PhoneNumber === undefined) {
            toast.error("Required fields are empty!");
            return;
        }
        navigate('/cardetails', { state: { name: FullName, age: age, address: address, gender: gender, PhoneNumber: PhoneNumber, carModel: location?.state?.carModel, carNumber: location?.state?.carNumber, description: location?.state?.description, plan:location?.state?.plan } })
    }

    return (
        <div>
            <Toaster/>
            <div className="container">
                <form>
                    <h1 style={{ display: "flex", justifyContent: "center", color: "black", fontFamily: "inherit", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>Client Details</h1>

                    <div className="ui divider"></div>
                    <div className="ui form">
                        <div className="change">

                            <div className="field" style={{ display: "flex", flexDirection: "row" }}>
                                <div style={{ flex: 1, marginRight: "1ch" }}>
                                    <TextField
                                        id="One"
                                        name="fullName"
                                        label="Full Name"
                                        variant="standard"
                                      required
                                        value={FullName}
                                        onChange={(e) => setFullName(e.target.value)} />
                                      
                                </div>
                                <div style={{ flex: 1 }}>
                                    <TextField id="Two" name="age" label="Age" variant="standard" value={age} onChange={(e) => setage(e.target.value)} required />
                                </div>
                            </div>


                            <div className="field">
                                <TextField
                                    id="standard-textarea"
                                    label="Address"
                                    placeholder="Address"
                                    multiline
                                    variant="standard"
                                    name="address"
                                    value={address}
                                    onChange={(e) => setaddress(e.target.value)}
                                    style={{ width: "100%" }}
                                    required
                                />
                            </div>

                            <div className="field">
                                <TextField
                                    id="standard-textarea"
                                    label="Phone Number"
                                    placeholder="Phone Number"
                                    variant="standard"
                                    name="phone number"
                                    type='tel'
                                    value={PhoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    sx={{ width: "100%" }}
                                    required
                                />
                            </div>

                            <div className="field">
                                <Box sx={{ minWidth: 120 }}>
                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue={location.state ? gender : "female"}
                                        // defaultValue="female"
                                        name="radio-buttons-group"
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        onChange={(e) => setgender(e.target.value)}
                                        required
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    </RadioGroup>
                                </Box>
                            </div>


                            <Button variant="contained" style={{ marginTop: "4ch" }} onClick={() => handleNext()} >Next</Button>

                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default ClientOnboarding;