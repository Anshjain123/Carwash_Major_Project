import React, { useState } from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import './Plans.css'
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import packages from '../packages.jpeg'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Toaster, toast } from "react-hot-toast";
import LoadingBar from 'react-top-loading-bar'
function Plans() {
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState(location?.state?.body.plan);
  const [progress, setprogress] = useState(0);

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const navigate = useNavigate();


  const handleSubmit = async (e) => {

    if (selectedPlan === undefined) {
      toast.error("choose a plan!");
      return;
    }
    e.preventDefault();

    setprogress(10);
    setprogress(20);
    setprogress(40);
    setprogress(50);
    setprogress(70);
    setprogress(90);


    let body = location.state.body;
    body.plan = selectedPlan;

    console.log(body);
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

  }



  return (
    <div className="plans" >
      <Toaster />
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setprogress(0)}
      />
      <div className="shaded-container"> {/* Add a shaded container div */}
        <img src={packages} alt="" />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
          <div style = {{padding:"10px"}} >


            <Card sx={{ minWidth: 275, }}>
              <CardContent>
                <FormControl>


                  <FormLabel id="demo-radio-buttons-group-label">Select Plans</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={selectedPlan}
                    onChange={handlePlanChange}
                    name="radio-buttons-group"
                    required
                  >
                    <FormControlLabel value="plan1" control={<Radio />} label="Plan-1 -- Basic Wash" style={{ marginBottom: "4%" }} />
                    <FormControlLabel value="plan2" control={<Radio />} label="Plan-2  --- Super Wash" style={{ marginBottom: "4%" }} />
                    <FormControlLabel value="plan3" control={<Radio />} label="Plan-3 --- Deluxe Wash" style={{ marginBottom: "4%" }} />
                  </RadioGroup>

                </FormControl>

              </CardContent>
            </Card>

          </div>
          <div>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Plans;