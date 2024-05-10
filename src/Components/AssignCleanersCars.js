import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { collection, getDoc, getDocs, arrayUnion, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import { Try } from '@mui/icons-material';
import toast, { Toaster } from 'react-hot-toast';
import "./AssignCleanersCars.css"
import StarIcon from '@mui/icons-material/Star';
import Tooltip from '@mui/material/Tooltip';


const AssignCleanersCars = () => {

    const [allClientCars, setallClientCars] = useState([]);
    const [allCleaners, setallCleaners] = useState([]);
    const [carNumber, setcarNumber] = useState("");
    const [carModel, setcarModel] = useState("");
    const [description, setdescription] = useState("");
    const [assigned, setassigned] = useState(false);
    const [id, setid] = useState("");
    const [assignedCleaners, setassignedCleaners] = useState([]);



    useEffect(() => {
        const getCleaners = async () => {

            try {

                let res = await fetch("http://localhost:8080/admin/cleaner/getAll", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                try {

                    let response = await res.json();
                    // console.log("printing all cleaners", response);
                    setallCleaners(response);
                } catch (error) {
                    console.log("printing error in assigningcleanercars in .json", error)
                }
            } catch (error) {
                console.log("printing error in assigncleaners car in fetching", error);
            }

        }
        getCleaners();


        const getClientCars = async () => {

            try {

                let res = await fetch("http://localhost:8080/admin/assignCars/getAll", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                try {
                    let response = await res.json();
                    console.log("printing cars", response);
                    setallClientCars(response);
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }

        }

        const getClientCarsAssignedCleaners = async () => {

            try {

                let res = await fetch("http://localhost:8080/admin/assignCars/getAllAssignedCleaners", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                try {
                    let response = await res.json();
                    console.log("printing assigned cleaners", response);
                    setassignedCleaners(response);
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }

        }
        getClientCars();
        getClientCarsAssignedCleaners();
    }, [])





    // console.log(allClientCars);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const [open, setOpen] = useState(false);
    const handleOpen = (row) => {
        setOpen(true);
        // console.log(row);
        setcarModel(row.carModel);
        setcarNumber(row.carNumber);
        setdescription(row.description);
        setid(row.id);
        // console.log(carNumber, "Yes");
    }
    const handleClose = () => setOpen(false);


    const handleassign = async (email, name, phone) => {

        try {

            let body = {
                email: email,
                phone: phone,
                carNumber: carNumber
            }
            let res = await fetch("http://localhost:8080/admin/assignCars/assignCarToCleaners", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)

            })


            console.log("Printing assigning cars to cleaners response", res);
            toast.success("Successfully assigned")

            handleClose();
        } catch (error) {
            console.log(error);
        }

    }

    const handleUnAssign = async (carNumber) => {


        try {

            let res = await fetch("http://localhost:8080/admin/assignCars/unassign", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ carNumber: carNumber })
            })

            if (res.ok) {
                toast.success("Successfully unassigned");
            }

            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    // console.log("Printing all cars-> ", allClientCars);
    return (
        <div className='assignCleanerCars' >
            <Toaster />
            <div className='table_assign_cleaners' >
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>carNumber</TableCell>
                                <TableCell align="right">carModel</TableCell>
                                <TableCell align="right">description</TableCell>
                                <TableCell align="right">Assigned</TableCell>
                                <TableCell align="right">Assigned Cleaner</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allClientCars.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.carNumber}
                                    </TableCell>
                                    <TableCell align="right">{row.carModel}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">{row.assigned ? <Tooltip placement='top-end' title="Unassign cleaner"><DoneIcon sx={{ color: 'green', cursor: 'pointer' }} onClick={() => handleUnAssign(row.carNumber)} /> </Tooltip>: <Tooltip placement='top-end' title="Assign Cleaner"><AddIcon style={{ cursor: 'pointer' }} onClick={() => handleOpen(row)} /></Tooltip>}</TableCell>
                                    <TableCell align="right">{row.assigned ? assignedCleaners[row.carNumber] : "NA"}</TableCell>

                                    {/* <TableCell align="right">NO</TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>name</TableCell>
                                    <TableCell align="right">Phone</TableCell>
                                    <TableCell align="right">email</TableCell>
                                    <TableCell align="right">Assign</TableCell>
                                    <TableCell align="right">Ratings</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allCleaners?.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.phone}</TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                
                                        <TableCell align="right"><Button className='assignButton' sx={{ color: 'white' }} onClick={() => handleassign(row.email, row.name, row.phone)} >Assign</Button></TableCell>
                                        <TableCell align="right">{row.totalRaters != 0 ? row.totalRatings / row.totalRaters : 0} <StarIcon id="icon" style={{ color: 'yellow' }} /></TableCell>
                                        {/* <TableCell align="right">NO</TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
        </div>
    )
}

export default AssignCleanersCars









// const allClientCars = [
//     {
//         carNumber: '123',
//         carModel: 'creta',
//         description: 'white',
//         assigned: false
//     },

//     {
//         carNumber: '456',
//         carModel: 'brezza',
//         description: 'red',
//         assigned: false
//     },

//     {
//         carNumber: '789',
//         carModel: 'innova',
//         description: 'white',
//         assigned: false
//     },

//     {
//         carNumber: '1985',
//         carModel: 'mercedes',
//         description: 'white',
//         assigned: false
//     },

//     {
//         carNumber: '489',
//         carModel: 'volvo',
//         description: 'white',
//         assigned: false
//     },
//     {
//         carNumber: '489',
//         carModel: 'volvo',
//         description: 'white',
//         assigned: false
//     },
//     {
//         carNumber: '489',
//         carModel: 'volvo',
//         description: 'white',
//         assigned: false
//     },
// ]


// const cleaners = [
//     {
//         name: 'abc',
//         phoneNumber: 45648,
//         email: 'dqewfw',
//     },
//     {
//         name: 'def',
//         phoneNumber: 7 / 791,
//         email: 'dew',
//     },
//     {
//         name: 'ghi',
//         phoneNumber: 41891,
//         email: 'dewffew',
//     },
//     {
//         name: 'jkl',
//         phoneNumber: 4564,
//         email: 'defafaeada',
//     },
//     {
//         name: 'mno',
//         phoneNumber: 458,
//         email: 'deadae',
//     },
//     {
//         name: 'fwf',
//         phoneNumber: 4648,
//         email: 'deeeeee',
//     },
// ]