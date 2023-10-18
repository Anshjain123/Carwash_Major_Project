import React, { useState } from 'react'
import './CleanerOnboarding.css'
import { useLocation, useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { getStorage, ref } from "firebase/storage";
import { Toaster, toast } from 'react-hot-toast';

const CleanerOnboarding = () => {
    const location = useLocation();
    console.log(location.state);
    const [imgurl, setimgurl] = useState(location?.state?.imgurl);
    const [Name, setName] = useState(location?.state?.name);
    const [BirthDate, setBirthDate] = useState(location?.state?.dob);
    const [email, setemail] = useState(location?.state?.email);
    const [Curraddress, setCurraddress] = useState(location?.state?.currAddress);
    const [permanentAddress, setpermanentAddress] = useState(location?.state?.permanentAddress);
    const [gender, setgender] = useState(location?.state?.gender);
    const [phoneNumber, setphoneNumber] = useState(location?.state?.phoneNumber);
    const [adhaar, setadhaar] = useState(location?.state?.adhaar);
    const [error, seterror] = useState(null);
    const navigate = useNavigate();

    const handleNavigate = (e) => {
        console.log(e.target.value);
    }

    const [type, settype] = useState(null)
    const handleCapture = async (target, Type) => {
        console.log(target);
        if (target.files) {
            const file = target.files[0];
            
            const storage = getStorage();
            var storagePath = "images/" + file.name; 
            const storageRef = ref(storage, storagePath);
             
            // console.log(file.name); 

            const type = typeof (file);
            settype(type);
            const newUrl = URL.createObjectURL(file);
        
            if(Type === "adhaar") {
                setadhaar(newUrl);
                console.log(newUrl)
            } else {
                setimgurl(newUrl);
            }

        }
    }

    const handleSubmit = async (e) => {
        
        if(Name === undefined || imgurl === undefined || BirthDate === undefined || email === undefined || Curraddress == undefined || permanentAddress === undefined || gender === undefined || phoneNumber === undefined || adhaar === undefined) {
            toast.error("required fields are empty!");
            return;
        }

        e.preventDefault()
        // console.log("Yes");
        // console.log(adhaar);
        await setDoc(doc(db, "cities", `${email}`), {
            Name: Name,
            email: email,
            DOB: BirthDate,
            currAddress: Curraddress,
            permanentAddress: permanentAddress,
            phoneNumber: phoneNumber,
            adhaar: adhaar,
            imgurl: imgurl,
            gender:gender 
        });
        toast.success("Cleaner registered successfully!");
        navigate("/cleaners")
    }

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleChangeemail = (e) => {
        if (!isValidEmail(e.target.value)) {
            seterror("invalid email");
        } else {
            seterror(null);
        }

        setemail(e.target.value);
    }

    return (
        <section class="vh-100 gradient-custom">
            <Toaster />
            <div class="container h-100">
                <div class="row justify-content-center align-items-center h-100">
                    <div class="col-12 col-lg-9 col-xl-7">
                        <div class="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
                            <div class="card-body p-4 p-md-5">
                                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                                <form>

                                    <div class="row">
                                        <div class="col-md-6">

                                            <div class="form-outline">
                                                <TextField id="standard-basic" label="Name" variant="standard" value={Name} onChange={(e) => setName(e.target.value)} sx={{ width: '100%' }} required />
                                            </div>

                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col-md-6 ">

                                            <div class="form-outline ">
                                                <TextField value={BirthDate} id="standard-basic" label="DOB (dd-mm-yyyy)" variant="standard" type='date' onChange={(e) => setBirthDate(e.target.value)} sx={{ width: '100%' }} required />

                                            </div>

                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-outline">
                                                {error && <div style={{ color: 'red' }}>{error}</div>}
                                                <TextField value={email} id="standard-basic" label="email (eg. abc@gmail.com)" disabled={location.state ? true : false} variant="standard" onChange={handleChangeemail} sx={{ width: '100%' }} required />
                                            </div>

                                        </div>
                                    </div>


                                    <div class="row">
                                        <div class="col-md-6 pb-2">

                                            <div class="form-outline">
                                                <TextField value={Curraddress} id="standard-basic" label="Current Address" variant="standard" onChange={(e) => setCurraddress(e.target.value)} sx={{ width: '100%' }} required />
                                            </div>

                                        </div>
                                        <div class="col-md-6 pb-2">

                                            <div class="form-outline">
                                                <TextField value={permanentAddress} id="standard-basic" label="Permanent Address" variant="standard" onChange={(e) => setpermanentAddress(e.target.value)} sx={{ width: '100%' }} required />
                                            </div>

                                        </div>

                                    </div>


                                    <div class="row">
                                        <div class="col-md-6">

                                            <div class="form-outline">
                                                <TextField value={phoneNumber} id="standard-basic" label="Phone Number" variant="standard" type='tel' onChange={(e) => setphoneNumber(e.target.value)} sx={{ width: '100%' }} required />
                                            </div>

                                        </div>
                                        <div class="col-md-6">

                                
                                                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue={location.state ? gender : "female"}
                                                    name="radio-buttons-group"
                                                    sx={{display:'flex', flexDirection:'row'}}
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
                                            <div class="col-md-6 mt-3">

                                                <div class="form-outline">
                                                    <input type="file" id="adhaar" onChange={(e) => handleCapture(e.target, "adhaar")} required />
                                                    <label class="form-label" for="adhaar">Adhaar Card Upload</label>
                                                    {location.state && <h6 style = {{color:'red'}}> adhaar already uploaded </h6>}
                                                </div>

                                            </div>
                                            <div class="col-md-6 mt-3">

                                                <div class="form-outline">
                                                    <input type="file" id="image" accept="image/*" onChange={(e) => handleCapture(e.target, "image")} required />
                                                    <label class="form-label" for="image">Image Upload</label>
                                                    {location.state && <h6 style = {{color:'red'}}> image already uploaded </h6>}
                                                </div>
                                                {/* 
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                        <Typography>Capture/upload photo</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <input type="file" id="permanentAddress" onChange={(e) => setimgurl(e.target.value)} />
                                                        <label>Upload</label>
                                                    </AccordionDetails>
                                                    
                                                    <AccordionDetails>
                                                        <input type="file" name="image" accept="image/*" id="file-input" capture="user" onChange={(e) => handleCapture(e.target)} />
                                                        <label for='file-input'>Camera</label>

                                                    </AccordionDetails>
                                                </Accordion> */}

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






