import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { Toaster, toast } from "react-hot-toast";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import "./CarDetails.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import LoadingBar from 'react-top-loading-bar'

function Cardetails() {



    const location = useLocation();
    console.log("printing location in cardetails");
    console.log(location.state.body);
    const [carModel, setCarModel] = useState((location.state.flag == "update" ? location.state.body.allClientCars[0].carModel : undefined));
    const [carNumber, setCarNumber] = useState((location.state.flag == "update" ? location.state.body.allClientCars[0].carNumber : undefined));
    const [description, setdescription] = useState((location.state.flag == "update" ? location.state.body.allClientCars[0].description : undefined));
    const [handleAddCarFlag, sethandleAddCarFlag] = useState((location.state.flag == "update" ? true : false));
    const [plan, setplan] = useState(location.state.flag == "update" ? location.state.body.allClientCars[0].plan : undefined);
    const [progress, setprogress] = useState(0);
    const [allClientCars, setallClientCars] = useState([]);
    const [planValidity, setplanValidity] = useState(location.state.flag == "update" ? location.state.body.allClientCars[0].planValidity : undefined);

    const navigate = useNavigate();

    let stateCodes = [
        'AP',
        'AR',
        'AN',
        'CG',
        'DN',
        'GA',
        'HP',
        'JK',
        'KL',
        'MP',
        'ML',
        'LD',
        'NL',
        'OD',
        'SK',
        'TN',
        'UK',
        'UP',
        'TR',
        'RJ',
        'PB',
        'PY',
        'DL',
        'MZ',
        'MN',
        'MH',
        'KA',
        'JH',
        'HR',
        'DD',
        'GJ',
        'CH',
        'BR',
        'AS'

    ]

    const handleSubmit = async (e) => {


        if (carNumber.length < 10) {
            toast.error("car number should be of atleast 10 length");
            return;
        }

        let state = carNumber.substring(0, 2)

        if (stateCodes.indexOf(state) == -1) {
            toast.error("please enter valid state car number");
            return;
        }
        if (carModel === undefined || carNumber === undefined || description === undefined) {
            toast.error("required fields are empty!");
            return;
        }
        if (plan == undefined) {
            toast.error("please chose a plan!");
            return;
        }

        const newObj = {
            carModel: carModel,
            carNumber: carNumber,
            description: description,
            plan: plan,
            planValidity: planValidity,
            assigned: false
        }

        let arr = allClientCars;
        arr.push(newObj);

        setallClientCars([...allClientCars, newObj]);
        // console.log("Before going to next we checking if allClientCars are set or not", allClientCars, "arr->", arr);

        let body;
        let flag;

        location.state.body.allClientCars = allClientCars;
        body = location.state.body;
        flag = location.state.flag;



        setprogress(10);
        setprogress(20);
        setprogress(40);
        setprogress(50);
        setprogress(70);
        setprogress(90);

        let response;

        if (location.state.flag == "update") {
            console.log("printing body in update", body);
            response = await fetch("http://localhost:8080/admin/client/update", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

        } else {
            response = await fetch("http://localhost:8080/admin/client/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
        }



        // console.log("Printing added clients response", response);

        setprogress(100);

        if (response.ok) {
            toast.success("Client is successfully added!");
            navigate("/clients");
        } else {
            toast.error("Client with same phone number already exists!");
        }

        // navigate("/plans", { state: { body, flag } });
    }





    const handleAddCar = () => {




        if (!(carModel === undefined || carNumber === undefined || description === undefined) && handleAddCarFlag === true) {
            const newObj = {
                carModel: carModel,
                carNumber: carNumber,
                description: description,
                plan: plan,
                planValidity: planValidity,
                assigned: false
            }

            setallClientCars([...allClientCars, newObj]);
        }

        console.log("handleaddcar");
        setCarModel("");
        setCarNumber("");
        setdescription("");
        setplan("");
        sethandleAddCarFlag(false);
        setplanValidity("");

    }
    // console.log(handleAddCarFlag, carNumber);

    const handleChangePlanValidity =(e) => {
        // let currDate = new Date(e.target.value).toLocaleDateString("en-GB");
        setplanValidity(e.target.value); 
        // console.log(planValidity); 
    }

    console.log(planValidity)

    return (
        <div className="carDetails" >
            <Toaster />
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setprogress(0)}
            />
            <div className="container"  >

                <form>
                    <h1 style={{ display: "flex", justifyContent: "center", alignItems: 'center', color: "black", fontFamily: "inherit" }}>Car Details</h1>

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
                                        value={carModel}
                                        required
                                        onChange={(e) => setCarModel(e.target.value)} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <TextField required id="Two" name="CarNumber" label="Car Number" variant="standard" value={carNumber} disabled={handleAddCarFlag} onChange={(e) => setCarNumber(e.target.value)} />
                                </div>
                            </div>


                            <div className="field">
                                <TextField
                                    required
                                    id="standard-textarea"
                                    label="Description"
                                    placeholder="detail description of car (max length 50)"
                                    multiline
                                    variant="standard"
                                    name="Description"
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                    style={{ width: "200%" }}
                                    inputProps={{ maxLength: 50 }}
                                />
                            </div>

                            <div className="field">
                                <div style={{ flex: 1 }} >
                                    <FormControl variant="standard" sx={{ width:"95%", }}>
                                        <InputLabel id="plan">Plan</InputLabel>
                                        <Select
                                            labelId="plan"
                                            id="plan"
                                            value={plan}
                                            onChange={(e) => setplan(e.target.value)}
                                            label="Plans"
                                        >
                                            <MenuItem value="plan1">Plan1</MenuItem>
                                            <MenuItem value="plan2">Plan2</MenuItem>
                                            <MenuItem value="plan3">Plan3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <TextField value={planValidity} id="standard-basic" label="plan validity (dd-mm-yyyy)" variant="standard" type='date' onChange={(e) => handleChangePlanValidity(e)} sx={{ width: '100%' }} required />

                                </div>

                            </div>


                            <Button variant="contained" style={{ marginTop: "4ch" }} onClick={() => handleSubmit()}>Submit</Button>


                        </div>
                    </div>

                </form>
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: "15px" }} >
                    <Fab onClick={() => handleAddCar()} color="dark" aria-label="add">
                        <AddIcon />
                    </Fab>
                </div>
            </div>

        </div>
    );
}

export default Cardetails;