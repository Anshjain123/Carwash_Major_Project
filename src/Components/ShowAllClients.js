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

const ShowAllClients = () => {

    const [allCleaners, setallCleaners] = useState(null);
    const [Val, setVal] = useState(null);
    const navigate = useNavigate();
    const [count, setcount] = useState(0)
    const fun = async () => {
        let arr = [];

        const querySnapshot = await getDocs(collection(db, "client"));
        querySnapshot.forEach((doc) => {
            let obj = {
                name: doc.data().name,
                phoneNumber: doc.data().phoneNumber,
                gender: doc.data().gender,
                description: doc.data().description,
                address: doc.data().address,
                carNumber: doc.data().CarNumber,
                carModel: doc.data().carModel,
                age: doc.data().age,
                plan: doc.data().plan
            }
            arr.push(obj);
        });

        setallCleaners(arr);
    }


    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "client", `${id}`));
        toast.success("Deleted Cleaner Successfully!");
        setcount(count + 1);
    }


    const handleUpdate = async (row) => {
        navigate("/registerClients", { state: row }); 
    }

    useEffect(() => {
        fun();
    }, [count])
    return (

        <div style={{ padding: '50px' }}>
            <div style={{ paddingBottom: '15px', paddingTop:'20px' }}>
                <Fab onClick={() => navigate("/registerClients")} color="dark" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
            <Toaster />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">PhoneNumber</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">description</TableCell>
                            <TableCell align="right">address</TableCell>
                            <TableCell align="right">CarModel</TableCell>
                            <TableCell align="right">CarNumber</TableCell>
                            <TableCell align="right">age</TableCell>
                            <TableCell align="right">Plan</TableCell>
                            <TableCell align="right">Delete</TableCell>
                            <TableCell align="right">Update</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allCleaners && allCleaners.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="right">{row.phoneNumber}  </TableCell>
                                <TableCell align="right">{row.gender} </TableCell>
                                <TableCell align="right">{row.description} </TableCell>
                                <TableCell align="right">{row.address} </TableCell>
                                <TableCell align="right">{row.carModel} </TableCell>
                                <TableCell align="right">{row.carNumber} </TableCell>
                                <TableCell align="right">{row.age} </TableCell>
                                <TableCell align="right">{row.plan} </TableCell>
                                <TableCell align="right"><DeleteIcon id="icon" onClick={() => handleDelete(row.phoneNumber)} /></TableCell>
                                <TableCell align="right"><EditIcon id="icon" onClick={() => handleUpdate(row)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ShowAllClients