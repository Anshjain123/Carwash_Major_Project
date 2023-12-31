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
        let arr = [];

        const querySnapshot = await getDocs(collection(db, "cities"));
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            let obj = {
                Name: doc.data().Name,
                dob: doc.data().DOB,
                phoneNumber: doc.data().phoneNumber,
                currentaddress: doc.data().currAddress,
                permanentAddress: doc.data().permanentAddress,
                email: doc.data().email,
                adhaar: doc.data().adhaar,
                imgurl: doc.data().imgurl,
                gender: doc.data().gender
            }
            arr.push(obj);
        });

        setallCleaners(arr);
    }


    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "cities", `${id}`));
        toast.success("Deleted Cleaner Successfully!");
        setcount(count + 1);
    }

    const fetchUrl = async (url) => {

        let blob = await fetch(url).then(r => r.blob());

        const reader = new FileReader();
        console.log(url)
        reader.readAsDataURL(blob);
        // let blob = await fetch(url).then(r => r.blob());
        // console.log(blob);  
    } 

    const handleUpdate = async (row) => {

        // fetchUrl(row.imgurl);

        navigate("/register", { state: { name: row.Name, dob: row.dob, phoneNumber: row.phoneNumber, currAddress: row.currentaddress, permanentAddress: row.permanentAddress, email: row.email, adhaar: row.adhaar, imgurl: row.imgurl, gender: row.gender } })
    }

    useEffect(() => {
        fun();
    }, [count])
    return (

        <div style={{ padding: '50px' }}>
            <div style={{ paddingBottom: '15px', paddingTop:'20px' }}>
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
                                <TableCell component="th" scope="row">{row.Name}</TableCell>
                                <TableCell align="right">{row.phoneNumber}  </TableCell>
                                <TableCell align="right">{row.dob} </TableCell>
                                <TableCell align="right">{row.currentaddress} </TableCell>
                                <TableCell align="right">{row.permanentAddress} </TableCell>
                                <TableCell align="right"><DeleteIcon id="icon" onClick={() => handleDelete(row.email)} /></TableCell>
                                <TableCell align="right"><EditIcon id="icon" onClick={() => handleUpdate(row)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ShowAllCleaners