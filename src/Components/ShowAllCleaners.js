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

const ShowAllCleaners = () => {

    const [allCleaners, setallCleaners] = useState(null);
    const [Val, setVal] = useState(null);
    const navigate = useNavigate();
    const [count, setcount] = useState(0)

    const fun = async () => {

        let res = await fetch("http://localhost:8080/admin/cleaner/getAll", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })


        let response = await res.json();

        setallCleaners(response);
        console.log("Printing cleaners", response);
    }


    const handleDelete = async (email) => {
        // await deleteDoc(doc(db, "cities", `${id}`));

        let res = await fetch(`http://localhost:8080/admin/cleaner/delete/${email}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            toast.success("Deleted Cleaner Successfully!");
            setcount(count + 1);
        } else {
            toast.error("Deletion unsuccessful!");
        }

    }


    const handleUpdate = async (row) => {

        // fetchUrl(row.imgurl);

        navigate("/register", { state: { name: row.name, DOB: row.dob, phone: row.phone, currAdd: row.currAdd, permanentAdd: row.permanentAdd, email: row.email, adhaar: row.adhaarUrl, imgurl: row.imageUrl, gender: row.gender } })
    }

    useEffect(() => {
        fun();
    }, [count])
    return (

        <div className='showAllCleaners'>
            <div>
                <div style={{ paddingBottom: '15px', paddingTop: '20px' }}>
                    <Fab onClick={() => navigate("/register")} color="dark" aria-label="add">
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
                                <TableCell align="right">DOB</TableCell>
                                <TableCell align="right">CurrentAddress</TableCell>
                                <TableCell align="right">PermanentAddress</TableCell>
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
                                    <TableCell align="right">{row.phone}  </TableCell>
                                    <TableCell align="right">{row.DOB} </TableCell>
                                    <TableCell align="right">{row.currAdd} </TableCell>
                                    <TableCell align="right">{row.permanentAdd} </TableCell>
                                    <TableCell align="right"><DeleteIcon id="icon" onClick={() => handleDelete(row.email)} /></TableCell>
                                    <TableCell align="right"><EditIcon id="icon" onClick={() => handleUpdate(row)} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}

export default ShowAllCleaners