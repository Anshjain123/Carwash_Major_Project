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

const AssignCleanersCars = () => {

    const [allCars, setallCars] = useState([]);
    const [allCleaners, setallCleaners] = useState([]);
    const [carNumber, setcarNumber] = useState("");
    const [carModel, setcarModel] = useState("");
    const [description, setdescription] = useState("");
    const [assigned, setassigned] = useState(false);
    const [id, setid] = useState("");



    useEffect(() => {
        const getCleaners = async () => {

            const querySnapshot = await getDocs(collection(db, "cities"))
            let arr = [];
            querySnapshot.forEach((doc) => {

                let newcleaner = {
                    email: doc.id,
                    name: doc.data().Name,
                    phoneNumber: doc.data().phoneNumber
                }
                arr.push(newcleaner);
                console.log(doc.id, " => ", doc.data());
            });

            setallCleaners(arr);
        }
        getCleaners();


        const getClients = async () => {
            const querySnapshot = await getDocs(collection(db, "client"));
            let arr = [];

            querySnapshot.forEach((doc) => {

                let cars = doc.data().allCars;
                cars.forEach((car) => {
                    let newObj = {
                        carModel: car.carModel,
                        carNumber: car.carNumber,
                        description: car.description,
                        id: doc.id,
                        assigned: car.assigned
                    }

                    arr.push(newObj);
                })
            })

            setallCars(arr);
        }

        getClients();
    }, [])





    console.log(allCars);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
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


    const handleassign = async (email, name, phoneNumber) => {
        console.log(carNumber);
        let docRef = doc(db, "cities", `${email}`);
        let docSnap = await getDoc(docRef);


        if (docSnap.exists()) {
            let newObj = {
                carNumber: carNumber,
                carModel: carModel,
                description: description,
                id: id
            }
            // Atomically add a new region to the "regions" array field.
            await updateDoc(docRef, {
                assignedCars: arrayUnion(newObj)
            });
        }

        docRef = doc(db, "client", `${id}`);

        let newObj = {
            carNumber: carNumber,
            carModel: carModel,
            description: description,
            assigned: false
        }
        // Atomically remove a region from the "regions" array field.
        await updateDoc(docRef, {
            allCars: arrayRemove(newObj)
        });

        newObj.assigned = true;
        // Atomically add a new region to the "regions" array field.
        await updateDoc(docRef, {
            allCars: arrayUnion(newObj)
        });

        await setDoc(doc(db, 'mappingCartocleaner', `${id}`), {  
            cleanerName:name, 
            cleanerPhoneNumber:phoneNumber
        })

        setassigned(true); 
        

    }

    console.log("Printing all cars-> ", allCars);
    return (
        <div style={{ padding: '80px' }} >
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>carNumber</TableCell>
                            <TableCell align="right">carModel</TableCell>
                            <TableCell align="right">description</TableCell>
                            <TableCell align="right">Assigned</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allCars.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.carNumber}
                                </TableCell>
                                <TableCell align="right">{row.carModel}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.assigned ? <DoneIcon sx={{ color: 'green' }} /> : <AddIcon style={{ cursor: 'pointer' }} onClick={() => handleOpen(row)} />}</TableCell>

                                {/* <TableCell align="right">NO</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
                                    <TableCell align="right">PhoneNumber</TableCell>
                                    <TableCell align="right">email</TableCell>
                                    <TableCell align="right">Assign</TableCell>
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
                                        <TableCell align="right">{row.phoneNumber}</TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right"><Button sx={{ color: 'white' }} onClick={() => handleassign(row.email, row.name, row.phoneNumber)} >Assign</Button></TableCell>

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









// const AllCars = [
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