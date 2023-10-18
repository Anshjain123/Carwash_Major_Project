import React, { useState } from "react";
import { Button, TextField, FormControl, Box, InputLabel, NativeSelect } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { Toaster, toast } from "react-hot-toast";


function Cardetails() {


    const location = useLocation();
    const [CarModel, setCarModel] = useState(location?.state?.carModel);
    const [CarNumber, setCarNumber] = useState(location?.state?.carNumber);
    const [description, setdescription] = useState(location?.state?.description);
    const navigate = useNavigate();
    const handleNext = () => {

        if(CarModel === undefined || CarNumber === undefined || description === undefined) {
            toast.error("required fields are empty!");
            return; 
        }
        navigate("/plans", { state: { name: location.state.name, age: location.state.age, address: location.state.address, gender: location.state.gender, carModel: CarModel, CarNumber: CarNumber, description: description, phoneNumber: location.state.PhoneNumber, plan: location?.state?.plan } });
    }

    return (
        <div>
            <Toaster/>
            <div className="container">
                <form>
                    <h1 style={{ display: "flex", justifyContent: "center", color: "black", fontFamily: "inherit", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>Car Details</h1>

                    <div className="ui divider"></div>
                    <div className="ui form">
                        <div className="change">

                            <div className="field" style={{ display: "flex", flexDirection: "row" }}>
                                <div style={{ flex: 1, marginRight: "1ch" }}>
                                    <TextField
                                        id="One"
                                        name="CarModel"
                                        label="Car Model"
                                        variant="standard"
                                        value={CarModel}
                                        required
                                        onChange={(e) => setCarModel(e.target.value)} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <TextField required id="Two" name="CarNumber" label="Car Number" variant="standard" value={CarNumber} onChange={(e) => setCarNumber(e.target.value)} />
                                </div>
                            </div>


                            <div className="field">
                                <TextField
                                    required
                                    id="standard-textarea"
                                    label="Discription"
                                    placeholder="Discription"
                                    multiline
                                    variant="standard"
                                    name="Discription"
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                    style={{ width: "200%" }}
                                />
                            </div>


                            <Button variant="contained" style={{ marginTop: "4ch" }} onClick={() => handleNext()}>Next</Button>

                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Cardetails;