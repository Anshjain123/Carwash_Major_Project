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

function Plans() {
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState(location?.state?.plan);

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  //   const handleSubmit = () => {
  //     // You can perform actions with the selected plan here
  //     console.log("Selected Plan: " + selectedPlan);
  //   };

  const navigate = useNavigate();


  const handleSubmit = async (e) => {

    if(selectedPlan === undefined) {
      toast.error("choose a plan!"); 
      return; 
    }
    e.preventDefault();

    await setDoc(doc(db, 'client', `${location.state.phoneNumber}`), {
      name: location.state.name,
      gender: location.state.gender,
      description: location.state.description,
      carModel: location.state.carModel,
      age: location.state.age,
      address: location.state.address,
      CarNumber: location.state.CarNumber,
      phoneNumber: location.state.phoneNumber,
      plan: selectedPlan,
      allCars: location.state.allCars
    })
    navigate("/clients");
  }



  return (
    <div>
      <Toaster/>
      <div className="shaded-container"> {/* Add a shaded container div */}
        <img src={packages} alt="" />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'center' }} >
          <div>


            <Card sx={{ minWidth: 275 }}>
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