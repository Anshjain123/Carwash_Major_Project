import React, { useState } from 'react'
import './CleanerOnboarding.css'
import { useLocation, useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import LoadingBar from 'react-top-loading-bar'
import ErrorIcon from '@mui/icons-material/Error';
// import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { Toaster, toast } from 'react-hot-toast';

const CleanerOnboarding = () => {
    const location = useLocation();
    // console.log(location.state);
    const [imgurl, setimgurl] = useState(location?.state?.imgurl);
    const [Name, setName] = useState(location?.state?.name);
    const [BirthDate, setBirthDate] = useState(location?.state?.DOB);
    const [email, setemail] = useState(location?.state?.email);
    const [Curraddress, setCurraddress] = useState(location?.state?.currAdd);
    const [permanentAddress, setpermanentAddress] = useState(location?.state?.permanentAdd);
    const [gender, setgender] = useState(location?.state?.gender);
    const [phoneNumber, setphoneNumber] = useState(location?.state?.phone);
    const [adhaar, setadhaar] = useState(location?.state?.adhaar);
    const [error, seterror] = useState(null);
    const [progress, setprogress] = useState(0);
    const [imageData, setimageData] = useState(null);
    const [adhaarData, setadhaarData] = useState(null);
    const [password, setpassword] = useState("")


    const navigate = useNavigate();

    const handleCapture = async (e, Type) => {
        if (Type === "image") {
            setimgurl(e.target.files[e.target.files.length - 1]);

        } else {
            setadhaar(e.target.files[e.target.files.length - 1]);

        }
    }

    const handleSubmit = async (e) => {

        if (Name === undefined || BirthDate === undefined || email === undefined || Curraddress === undefined || permanentAddress === undefined || gender === undefined || phoneNumber === undefined) {
            toast.error("required fields are empty!");
            return;
        }

        e.preventDefault();
        setprogress(10);
        setprogress(20);
        setprogress(40);
        setprogress(50);
        setprogress(70);
        setprogress(80);


        let body = {
            email: email,
            name: Name,
            DOB: BirthDate,
            currAdd: Curraddress,
            permanentAdd: permanentAddress,
            phone: phoneNumber,
            gender: gender,
            imageUrl: "abc",
            adhaarUrl: "abc",
            password:password
        }



        const formData = new FormData();
        formData.append('imageData', imgurl);
        formData.append('imageName', imgurl.name);
        formData.append('adhaarData', adhaar);
        formData.append('adhaarName', adhaar.name);
        formData.append('cleaner', new Blob([JSON.stringify(body)], { type: 'application/json' }));

        // console.log(body.DOB, typeof(body.DOB));

        if (!location?.state) {

            let response = await fetch("http://localhost:8080/admin/cleaner/add", {
                method: "POST",
                body: formData,
            })

            if (response.ok) {

                toast.success("Cleaner registered successfully!");
                
                setprogress(100);
                navigate("/cleaners")
            } else {
                setprogress(100);
                let res = await response.text();
                let res2 = JSON.parse(res);
                // console.log(res2);
                toast.error(res2.error);

            }

        } else {

            let response = await fetch(`http://localhost:8080/admin/cleaner/update/${email}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

            // console.log("Updated response", response); 
            if (response.ok) {
                toast.success("Cleaner updated successfully");
                setprogress(100);
                navigate("/cleaners")
            } else {
                setprogress(100);
                toast.error("Cleaner not updated please try again after some time!");
            }

        }

    }


    // console.log(location?.state?.imageUrl);

    function isValidEmail(email) {

        const emailRegex = /^[a-zA-Z0-9._-]+@gmail.com$/;
        return emailRegex.test(email);
    }
    const isValidPhoneNumber =(phone) => {
        return phone.length == 10; 
    }

    const handleChangeemail = (e) => {
        if (!isValidEmail(e.target.value)) {
            seterror("invalid detail");
        } else {
            seterror(null);
        }

        setemail(e.target.value);
    }
    const handleChangePhone = (e) => {
        if(!isValidPhoneNumber(e.target.value)) {
            seterror("invalid detail"); 
        } else {
            seterror(null); 
        }

        setphoneNumber(e.target.value); 
    }

    return (
        <section class="gradient-custom" id='cleanerOnBoarding' >
            <Toaster />
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setprogress(0)}
            />
            <div class="container h-100">
                <div class="row justify-content-center align-items-center h-100">
                    <div class="col-12 col-lg-9 col-xl-7">
                        <div class="card shadow-2-strong card-registration" id='card' style={{ borderRadius: "15px" }}>
                            <div class="card-body p-4 p-md-5">
                                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                                <form>

                                    <div class="row ">
                                        <div class="col-md-6 my-3" style={{ display: 'flex', justifyContent: 'space-between' }}>

                                            <div class="form-outline">
                                                <TextField id="standard-basic" label="Name" variant="standard" value={Name} onChange={(e) => setName(e.target.value)} sx={{ width: '100%' }} required />
                                            </div>


                                        </div>

                                        <div class="col-md-6 my-3" style={{ display: 'flex', justifyContent: 'space-between' }}>

                                            <div class="form-outline">
                                                <TextField type='password' id="standard-basic" label="Password" variant="standard" value={password} disabled={location.state ? true : false} onChange={(e) => setpassword(e.target.value)} sx={{ width: '100%' }} required />
                                            </div>


                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col-md-6 my-3">

                                            <div class="form-outline ">
                                                <TextField value={BirthDate} id="standard-basic" label="DOB (dd-mm-yyyy)" variant="standard" type='date' onChange={(e) => setBirthDate(e.target.value)} sx={{ width: '100%' }} required />

                                            </div>

                                        </div>

                                        <div class="col-md-6 my-3">
                                            <div class="form-outline" style = {{display:"flex"}} >
                                                
                                                <TextField value={email} id="standard-basic" label="email (eg. abc@gmail.com)" disabled={location.state ? true : false} variant="standard" onChange={handleChangeemail} sx={{ width: '100%' }} required />
                                                {error && <div style={{ color: 'red', display:'flex', flexDirection:'column', justifyContent:'center' }}><ErrorIcon/></div>}
                                            </div>

                                        </div>
                                    </div>


                                    <div class="row">
                                        <div class="col-md-6 pb-2 my-3">

                                            <div class="form-outline">
                                                <TextField value={Curraddress} id="standard-basic" label="Current Address" variant="standard" onChange={(e) => setCurraddress(e.target.value)} sx={{ width: '100%' }} required />
                                            </div>

                                        </div>
                                        <div class="col-md-6 pb-2 my-3">

                                            <div class="form-outline">
                                                <TextField value={permanentAddress} id="standard-basic" label="Permanent Address" variant="standard" onChange={(e) => setpermanentAddress(e.target.value)} sx={{ width: '100%' }} required />
                                            </div>

                                        </div>

                                    </div>


                                    <div class="row">
                                        <div class="col-md-6 my-3">

                                            <div class="form-outline">
                                                <TextField value={phoneNumber} id="standard-basic" onChange={handleChangePhone} label="Phone Number" variant="standard" type='tel' sx={{ width: '100%' }} required />
                                            </div>

                                        </div>
                                        <div class="col-md-6 my-3">


                                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue={location.state ? gender : "female"}
                                                name="radio-buttons-group"
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                onChange={(e) => setgender(e.target.value)}
                                                required
                                            >
                                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                                            </RadioGroup>
                                            {/* </FormControl> */}

                                        </div>


                                        <div class="row">
                                            <div class="col-md-6 mt-3 my-3">

                                                <div class="form-outline">
                                                    <input disabled={location.state ? true : false} type="file" id="adhaar" onChange={(e) => handleCapture(e, "adhaar")} required />
                                                    <label class="form-label" for="adhaar">Adhaar Card Upload</label>
                                                    {location.state && <h6 style={{ color: 'red' }}> adhaar already uploaded </h6>}
                                                </div>

                                            </div>
                                            <div class="col-md-6 mt-3 my-3">

                                                <div class="form-outline" >
                                                    <input disabled={location.state ? true : false} type="file" id="image" onChange={(e) => handleCapture(e, "image")} required title='chose file'/>
                                                    <label class="form-label" for="image">Image Upload</label>
                                                    {location.state && <h6 style={{ color: 'red' }}> image already uploaded </h6>}
                                                </div>


                                            </div>

                                        </div>

                                    </div>

                                    <div class="mt-4 ">
                                        <input class="btn btn-primary btn-lg" type='button' value="submit" onClick={handleSubmit} />

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default CleanerOnboarding






