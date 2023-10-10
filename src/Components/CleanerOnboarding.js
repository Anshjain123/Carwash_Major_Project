import React, { useState } from 'react'
import './CleanerOnboarding.css'
import { useNavigate } from 'react-router';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import { Toaster, toast } from 'react-hot-toast';

const CleanerOnboarding = () => {
    const [imgurl, setimgurl] = useState(null);
    const [Name, setName] = useState("");
    const [BirthDate, setBirthDate] = useState(null);
    const [email, setemail] = useState(null);
    const [Curraddress, setCurraddress] = useState(null);
    const [permanentAddress, setpermanentAddress] = useState(null);
    const [gender, setgender] = useState(null);
    const [phoneNumber, setphoneNumber] = useState(null)
    const [adhaar, setadhaar] = useState(null)

    const navigate = useNavigate();

    const handleNavigate = (e) => {
        console.log(e.target.value);
    }

    const [type, settype] = useState(null)
    const handleCapture = async (target) => {
        if (target.files) {
            const file = target.files[0];
            const type = typeof(file);
            settype(type);
            const newUrl = URL.createObjectURL(file);
            setimgurl(newUrl);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log("Yes");
        await setDoc(doc(db, "cities", `${email}`), {
            Name:Name, 
            email:email,
            DOB:BirthDate, 
            currAddress:Curraddress, 
            permanentAddress:permanentAddress, 
            phoneNumber:phoneNumber, 
            adhaar:adhaar, 
            imgurl:imgurl
        });
        toast.success("Cleaner registered successfully!"); 
        navigate("/cleaners")
    }
    return (
        <section class="vh-100 gradient-custom">
            <Toaster/>
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
                                                <input type="text" id="firstName" onChange={(e) => setName(e.target.value)} class="form-control form-control-lg" />
                                                <label class="form-label" for="firstName">Name</label>
                                            </div>

                                        </div>
                                        
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6 d-flex align-items-center">

                                            <div class="form-outline datepicker w-100">
                                                <input type="date" class="form-control form-control-lg" id="birthdayDate" onChange={(e) => setBirthDate(e.target.value)} />
                                                <label for="birthdayDate" class="form-label">Birthday</label>
                                            </div>

                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-outline">
                                                <input type="email" id="emailAddress" class="form-control form-control-lg" onChange={(e) => setemail(e.target.value)} />
                                                <label class="form-label" for="emailAddress">Email</label>
                                            </div>

                                        </div>
                                    </div>


                                    <div class="row">
                                        <div class="col-md-6 pb-2">

                                            <div class="form-outline">
                                                <input type="text" id="Currentaddress" class="form-control form-control-lg" onChange={(e) => setCurraddress(e.target.value)} />
                                                <label class="form-label" for="adhaar">Current Address</label>
                                            </div>

                                        </div>
                                        <div class="col-md-6 pb-2">

                                            <div class="form-outline">
                                                <input type="text" id="permanentAddress" class="form-control form-control-lg" onChange={(e) => setpermanentAddress(e.target.value)} />
                                                <label class="form-label" for="adhaar">Permanent Address</label>
                                            </div>

                                        </div>

                                    </div>


                                    <div class="row">
                                        <div class="col-md-6">

                                            <div class="form-outline">
                                                <input type="tel" id="phoneNumber" class="form-control form-control-lg" onChange={(e) => setphoneNumber(e.target.value)} />
                                                <label class="form-label" for="phoneNumber">Phone Number</label>
                                            </div>

                                        </div>
                                        <div class="col-md-6">

                                            <h6 class="mb-2">Gender: </h6>

                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender"
                                                    value="option1" checked />
                                                <label class="form-check-label" for="MaleGender">Male</label>
                                            </div>

                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender"
                                                    value="option2" />
                                                <label class="form-check-label" for="FemaleGender">Female</label>
                                            </div>

                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender"
                                                    value="option3" />
                                                <label class="form-check-label" for="otherGender">Other</label>
                                            </div>


                                        </div>


                                        <div class="row">
                                            <div class="col-md-6 mt-3">

                                                <div class="form-outline">
                                                    <input type="file" id="Currentaddress" onChange={(e) => setadhaar(e.target.value)} />
                                                    <label class="form-label" for="adhaar">Adhaar Card Upload</label>
                                                </div>

                                            </div>
                                            <div class="col-md-6 mt-3">


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
                                                        {/* <button style = {{border:'none'}}  >Camera</button> */}
                                                        <input type="file" name="image" accept="image/*" id="file-input" capture="user" onChange={(e) => handleCapture(e.target)} />
                                                        <label for='file-input'>Camera</label>

                                                    </AccordionDetails>
                                                </Accordion>

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






