import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { Toaster, toast } from 'react-hot-toast';
import './ShowAllCleaners.css'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { useNavigate } from 'react-router';
import "./ShowAllClients.css"


const ShowAllClients = () => {

    // const [allCleaners, setallCleaners] = useState(null);
    const [clients, setclients] = useState(null)
    const [Val, setVal] = useState(null);
    const navigate = useNavigate();
    const [count, setcount] = useState(0)


    const retrieveAllClients = async () => {

        try {
            let response = await fetch("http://localhost:8080/admin/client/getAll", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })


            if (response.ok) {
                // console.log(response); 
                try {
                    let res = await response.json();
                    console.log("printing response in showallclients");
                    console.log(res);
                    // setclients(res);

                    let arr = [];
                    for (let i = 0; i < res.length; i++) {
                        let obj = res[i];
                        let carsArr = obj.allClientCars;
                        // console.log(carsArr); 
                        delete obj.allClientCars;
                        let newObj = {}
                        for (let j = 0; j < carsArr.length; j++) {
                            let car = carsArr[j];

                            let newDate = new Date(car.planValidity);
                            let formattedDate = newDate.toLocaleDateString("en-GB", { day: '2-digit', month: '2-digit', year: 'numeric' });

                            car.planValidity = formattedDate;
                            const concatenatedObj = { ...car, ...obj };
                            arr.push(concatenatedObj);
                        }

                    }

                    setclients(arr);

                    // console.log("printing updated clients", clients);
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }

    }


    const handleDelete = async (carNumber) => {

        let res = await fetch(`http://localhost:8080/admin/client/delete/${carNumber}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            }
        })
        // console.log(res);
        setcount(count + 1);
    }


    const handleUpdate = async (row) => {

        console.log("printing row");
        console.log(row);
        let allClientCars = [
            {
                carModel: row.carModel,
                carNumber: row.carNumber,
                description: row.description,
                plan: row.plan,
                planValidity: row.planValidity,
                assigned: row.assigned
            }
        ]

        let body = {
            name: row.name,
            age: row.age,
            gender: row.gender,
            address: row.address,
            phone: row.phone,
            allClientCars: allClientCars,
            password: row.password,
            email: row.email
        }
        navigate("/registerClients", { state: body });
    }


    const handleNotify = async (carNumber) => {
        let res = await fetch(`http://localhost:8080/admin/client/notify`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ carNumber: carNumber })  
        })
        // let response = await res.json(); 
        // console.log(response); 
        // console.log(res); 

        if(res.ok) {
            toast.success("notification sent to user successfully!"); 
        } else {
            toast.error("notification can't be sent please try again later!"); 
        }
    }

    useEffect(() => {
        retrieveAllClients();
    }, [count])
    return (

        <div className='showAllClients'>
            <div className='client_add_icon' >
                <Fab onClick={() => navigate("/registerClients")} color="dark" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
            <Toaster />
            <div className='table_clients'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">PhoneNumber</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Gender</TableCell>
                                <TableCell align="right">description</TableCell>
                                <TableCell align="right">address</TableCell>
                                <TableCell align="right">carModel</TableCell>
                                <TableCell align="right">carNumber</TableCell>
                                <TableCell align="right">age</TableCell>
                                <TableCell align="right">Plan</TableCell>
                                <TableCell align="right">Plan Validity</TableCell>
                                <TableCell align="right">Delete</TableCell>
                                <TableCell align="right">Update</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clients && clients.map((row, index) => (

                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >



                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="right">{row.phone}  </TableCell>
                                    <TableCell align="right">{row.email}  </TableCell>
                                    <TableCell align="right">{row.gender} </TableCell>
                                    <TableCell align="right">{row.description} </TableCell>
                                    <TableCell align="right">{row.address} </TableCell>
                                    <TableCell align="right">{row.carModel} </TableCell>
                                    <TableCell align="right">{row.carNumber} </TableCell>
                                    <TableCell align="right">{row.age} </TableCell>
                                    <TableCell align="right">{row.plan} </TableCell>
                                    <TableCell align="right">{row.planValidity} </TableCell>
                                    <TableCell align="right"><DeleteIcon id="icon" onClick={() => handleDelete(row.carNumber)} /></TableCell>
                                    <TableCell align="right"><EditIcon id="icon" onClick={() => handleUpdate(row)} /></TableCell>
                                    <TableCell align="right"><Button onClick={() => navigate("/getImagesDayWise", { state: { carNumber: row.carNumber } })} variant="contained" >images</Button></TableCell>
                                    <TableCell align="right"><Button variant="contained" onClick={() => handleNotify(row.carNumber)} >Notify</Button></TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}

export default ShowAllClients