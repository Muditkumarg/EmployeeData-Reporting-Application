import { Button, Select } from "@mui/material";
import React from "react";
import './login.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from "@mui/system/Unstable_Grid/Grid";
import { Card, CardContent, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios"
import swal from "sweetalert";
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import { CSVLink } from "react-csv";
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
export default function Form({passData}) {
    const navigate = useNavigate();
    const initialState = { name: '', email: '', phone: '', address: '', department: '',company:'' }
    const [data, setData] = useState(initialState);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    const headers = [
        {label:"Deparment", key: "department"},
        {label:"Company", key: "company"}
    ]
    const [open, setOpen] = React.useState(false);
    const postEmployeeData = () => {
        axios.post("http://localhost:5000/api/EmployeeData", data)
            .then((res) => {
                const { success, message, result } = res.data
                if (success) {
                    swal({
                        text: message,
                        icon: "success",
                    }).then(() => {
                        setData(result)
                    })
                } else {
                    swal({
                        text: message,
                        icon: "error"
                    })
                }
            })
    }
    const [errors, setErrors] = React.useState({});
    const handleValidate = (value) => {
        let errors = {};
        const regixForEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const regixForPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (!value.name) {
            errors.name = "first name is required."
        }
        if (!value.address) {
            errors.address = "email is required."
        }
        if (!value.department) {
            errors.department = "department is required."
        }
        if (!value.company) {
            errors.company = "company is required."
        }
        if (!regixForEmail.test(value.email) || !regixForPhone.test(value.phone)) {
            swal({
                text: "email or phone formate wrong!",
                icon: "error"
            })
            errors.email = "email is required @gmail.com formate"
            errors.phone = "phone is require [10-12]";
        } else {
            postEmployeeData();
            setOpen(false);
            setTimeout(() => {
                window.location.reload(false);
            }, 2000);
        }
        setErrors(errors);
    }
    const handleOpen = () => {
        setOpen(true);
    }
    const close = () => {
        navigate('/')
    }
    const handleSubmit = () => {
        handleValidate(data);
    }
    const remove = () => {
        setOpen(false);
    }
    return (
        <>
            <div className="btn form-btn-adjustment">
                <Button variant="contained" color="success" className="add-btn" onClick={handleOpen}  >Add New Record</Button>
                <CSVLink data={passData} headers={headers}>
                    <Button variant="contained">Export</Button>
                    </CSVLink>
                <Button variant="contained" className="log-btn" onClick={close}>Log Out</Button>
            </div>
            <Modal
                open={open}>
                <Box sx={style}>
                    <Typography >Employee Data Form</Typography>
                    <Typography sx={{ mt: 2 }}>
                    </Typography>
                    <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5">Please Fill the detail</Typography>
                            <form>
                                <Grid container spacing={1} >
                                    <Grid xs={12} item>
                                        <TextField label="Name" required name="name" onChange={handleInputChange} placeholder="Enter name" fullWidth   ></TextField>
                                        <p className="textColor">{errors.name}</p>
                                    </Grid>
                                    <Grid xs={12} item>
                                        <TextField label="Email" required name="email" onChange={handleInputChange} placeholder="Enter Email Id" fullWidth></TextField>
                                        <p className="textColor">{errors.email}</p>
                                    </Grid>
                                    <Grid xs={12} item>
                                        <TextField label="Phone" name="phone" onChange={handleInputChange} placeholder="Enter Phone Number" fullWidth></TextField>
                                        <p className="textColor">{errors.phone}</p>
                                    </Grid>
                                    <Grid xs={12} item>
                                        <TextField label="Address" required name="address" onChange={handleInputChange} placeholder="Enter your Address" fullWidth></TextField>
                                        <p className="textColor">{errors.address}</p>
                                    </Grid>
                                    <Grid xs={12} item>
                                        <TextField label="Department" required name="department" onChange={handleInputChange} value={data.department} placeholder="Enter your Department" fullWidth select>
                                            <MenuItem value={"Software"} >Software</MenuItem>
                                            <MenuItem value={"Hardware"}>Hardware</MenuItem>
                                            <MenuItem value={"Sales"}>Sales</MenuItem>
                                        </TextField>
                                        <p className="textColor">{errors.department}</p>
                                    </Grid>
                                    <Grid xs={12} item>
                                        <TextField label="Company" required name="company" value={data.company} onChange={handleInputChange} placeholder="Enter your Company Name" fullWidth select>
                                            <MenuItem value={"Spraxa Solution"} >Spraxa Solution</MenuItem>
                                            <MenuItem value={"Stream4tech"} >Stream4tech</MenuItem>
                                            <MenuItem value={"CoolR Group"}>CoolR Group</MenuItem>
                                            </TextField>
                                            <p className="textColor">{errors.company}</p>
                                    </Grid>
                                </Grid>
                                <div className="btn2-adjustment" >
                                    <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>submit</Button>
                                    <Button variant="contained" fullWidth onClick={remove} className="remove-style">cancle</Button>
                                </div>
                            </form>
                        </CardContent>

                    </Card>
                </Box>
            </Modal>
        </>
    )
}