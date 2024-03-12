import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { Toaster, toast } from "react-hot-toast";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import "./CarDetails.css"


function Cardetails() {



    const location = useLocation();
    console.log(location.state.body);
    const [carModel, setCarModel] = useState((location.state.flag == "update" ? location.state.body.allClientCars[0].carModel : undefined));
    const [carNumber, setCarNumber] = useState((location.state.flag == "update" ? location.state.body.allClientCars[0].carNumber : undefined));
    const [description, setdescription] = useState((location.state.flag == "update" ? location.state.body.allClientCars[0].description : undefined));
    const [handleAddCarFlag, sethandleAddCarFlag] = useState((location.state.flag == "update" ? true : false));


    const [allClientCars, setallClientCars] = useState([]);

    const navigate = useNavigate();
    const handleNext = () => {


        if(carNumber.length < 10) {
            toast.error("car number should be of atleast 10 length");
            return;
        }
        let state = carNumber.substring(0, 3)
        if(stateCodes.indexOf(state) == -1) {
            toast.error("please enter valid state car number");
            return;
        }
        if (carModel === undefined || carNumber === undefined || description === undefined) {
            toast.error("required fields are empty!");
            return;
        }

        const newObj = {
            carModel: carModel,
            carNumber: carNumber,
            description: description,
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

        navigate("/plans", { state: { body, flag } });
    }


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


    const handleAddCar = () => {

        

        if (!(carModel === undefined || carNumber === undefined || description === undefined)) {
            sethandleAddCarFlag(false);
            const newObj = {
                carModel: carModel,
                carNumber: carNumber,
                description: description,
                assigned: false
            }

            setallClientCars([...allClientCars, newObj]);
        }

        console.log("handleaddcar");
        setCarModel("");
        setCarNumber("");
        setdescription("");
    }
    // console.log(handleAddCarFlag, carNumber);

    return (
        <div className="carDetails" >
            <Toaster />
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


                            <Button variant="contained" style={{ marginTop: "4ch" }} onClick={() => handleNext()}>Next</Button>

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