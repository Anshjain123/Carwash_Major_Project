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
import LoadingBar from 'react-top-loading-bar'
import ErrorIcon from '@mui/icons-material/Error';
import Tooltip from '@mui/material/Tooltip';
function ClientOnboarding() {

    // const [Data, setData] = useState({ fullName: "", age: "", address: "", gender: "male" });
    console.log("printing location in client on boarding");
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state);
    const [name, setname] = useState(location?.state?.name);
    const [age, setage] = useState(location?.state?.age);
    const [address, setaddress] = useState(location?.state?.address);
    const [addressLine, setaddressLine] = useState(location?.state?.allClientAddresses[0].addressLine);
    const [pincode, setpincode] = useState(location?.state?.allClientAddresses[0].pincode);
    const [city, setcity] = useState(location?.state?.allClientAddresses[0].city);
    const [state, setstate] = useState(location?.state?.allClientAddresses[0].state);
    const [gender, setgender] = useState(location?.state?.gender)
    const [phone, setphone] = useState(location?.state?.phone);
    const [email, setemail] = useState(location?.state?.email);
    const [progress, setprogress] = useState(0);
    const [password, setpassword] = useState(location?.state?.password);
    const [error, seterror] = useState(false);
    const [emailError, setemailError] = useState(false);
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

        if (name === undefined || age === undefined || gender === undefined || phone === undefined || addressLine === undefined || pincode === undefined || city == undefined || state === undefined) {
            toast.error("Required fields are empty or fields are wrong!");
            return;
        }

        setprogress(10);
        setprogress(20);
        setprogress(40);
        setprogress(50);
        setprogress(70);
        setprogress(90);



        let body;
        let flag;
        if (location?.state) {
            location.state.name = name;
            location.state.age = age;
            location.state.address = address;
            location.state.gender = gender;
            body = location.state;
            flag = "update";
        } else {
            flag = "add"
            let allClientAddresses = [
                {
                    addressLine: addressLine,
                    pincode: pincode,
                    city: city,
                    state: state
                }
            ]
            body = {
                name: name,
                age: age,
                gender: gender,
                phone: phone,
                password: password,
                email: email,
                allClientAddresses:allClientAddresses
            }
        }

        navigate('/cardetails', { state: { body, flag: flag } });


        setprogress(100);

    }

    const isEveryDigit = (phone) => {

        for (let i = 0; i < phone.length; i++) {
            if (!(phone[i] >= '0' && phone[i] <= '9')) {
                return false;
            }
        }
        return true;
    }

    const isValidPhone = (phone) => {
        return (phone.length == 10 && isEveryDigit(phone));
    }
    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@gmail.com$/;
        return emailRegex.test(email);
    }

    const handleChangePhone = (e) => {
        if (isValidPhone(e.target.value)) {
            seterror(false);
        } else {
            seterror(true);
        }
        setphone(e.target.value);
    }

    const handleChangeEmail = (e) => {
        if (isValidEmail(e.target.value)) {
            setemailError(false);
        } else {
            setemailError(true);
        }
        setemail(e.target.value);
    }

    return (
        <div className="clientOnBoarding">
            <Toaster />

            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setprogress(0)}
            />
            <div className="container">
                <form>
                    <h1 style={{ display: "flex", justifyContent: "center", color: "black", fontFamily: "inherit", }}>Client Details</h1>

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
                                        value={name}
                                        onChange={(e) => setname(e.target.value)} />

                                </div>
                                <div style={{ flex: 1 }}>
                                    <TextField id="Two" name="age" label="Age" variant="standard" value={age} onChange={(e) => setage(e.target.value)} required />
                                </div>
                            </div>


                            <div className="field">
                                <TextField
                                    id="standard-textarea"
                                    label="AddressLine"
                                    placeholder="AddressLine"
                                    multiline
                                    variant="standard"
                                    name="addressline"
                                    value={addressLine}
                                    onChange={(e) => setaddressLine(e.target.value)}
                                    style={{ width: "100%", marginRight:'1ch' }}
                                    required

                                />
                                <TextField
                                    id="standard-textarea"
                                    label="pincode"
                                    placeholder="Pincode"
                                    multiline
                                    variant="standard"
                                    name="pincode"
                                    value={pincode}
                                    onChange={(e) => setpincode(e.target.value)}
                                    style={{ width: "100%" }}
                                    required
                                />
                            </div>

                            <div className="field">
                                <TextField
                                    id="standard-textarea"
                                    label="city"
                                    placeholder="City"
                                    multiline
                                    variant="standard"
                                    name="city"
                                    value={city}
                                    onChange={(e) => setcity(e.target.value)}
                                    style={{ width: "100%", marginRight:'1ch' }}
                                    required
                                />
                                <TextField
                                    id="standard-textarea"
                                    label="state"
                                    placeholder="State"
                                    multiline
                                    variant="standard"
                                    name="state"
                                    value={state}
                                    onChange={(e) => setstate(e.target.value)}
                                    style={{ width: "100%" }}
                                    required
                                />
                            </div>

                            <div className="field">
                                <TextField
                                    id="standard-textarea"
                                    label="Phone Number"
                                    placeholder="Phone Number (must be of 10 digits)"
                                    variant="standard"
                                    name="phone number"
                                    type='tel'
                                    disabled={location.state ? true : false}
                                    value={phone}
                                    onChange={handleChangePhone}
                                    sx={{ width: "100%" }}
                                    required
                                />
                                {error && <div style={{ color: 'red', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                                    <Tooltip title="phone number must of length 10" placement="top">
                                        <ErrorIcon />
                                    </Tooltip>

                                </div>}
                            </div>
                            <div className="field">
                                <TextField
                                    id="standard-textarea"
                                    label="Email"
                                    placeholder="Enter your email (e.g. abc@gmail.com)"
                                    variant="standard"
                                    name="email"
                                    value={email}
                                    onChange={handleChangeEmail}
                                    sx={{ width: "100%" }}
                                    required
                                />
                                {emailError && <div style={{ color: 'red', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                                    <Tooltip title="please enter valid email address" placement="top">
                                        <ErrorIcon />
                                    </Tooltip>

                                </div>}
                            </div>

                            <div className="field">
                                <TextField
                                    id="standard-textarea"
                                    label="Password"
                                    placeholder="Password"
                                    variant="standard"
                                    name="Password"
                                    type='password'
                                    value={password}
                                    disabled={location.state ? true : false}
                                    onChange={(e) => setpassword(e.target.value)}
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