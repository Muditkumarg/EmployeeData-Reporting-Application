import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Paper } from '@mui/material';
import './login'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Grid from "@mui/system/Unstable_Grid/Grid";
import { Card, CardContent, TextField, Modal, Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import swal from 'sweetalert';
import DChart from '../component/DonutChart';
import {apis} from "./Url";
import Form from './Form';
import DonutChartComp from './DonutCharComp';
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
export default function DataTable() {
    const [empData, setEmpData] = useState([]);
    const [deleteId, setDeleteId] = useState();
    const [opendetail, setOpenDetail] = useState(false);
    const [details, setDetails] = useState({})
    const [editDetail, setEditDetail] = useState();
    const handleUpdate = (e, currentRow) => {
        setDetails(e.row)
        setOpenDetail(true);
    }
    const columns = [
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phone', headerName: 'Phone', width: 200 },
        { field: 'address', headerName: 'Address', width: 250, },
        { field: 'department', headerName: 'Department', width: 250, },
        {field:'company', headerName:'Company Name', width:250},
        {
            field: "Action", width: 250,
            renderCell: (params) => {
                return (
                    <div className='btn-adjustment'><Button variant="contained" onClick={() => handleUpdate(params)}>Edit</Button>
                        <Button variant="contained" onClick={() => deleteData(params)}>Delete</Button>
                    </div>
                );
            }
        },
    ];
    const handleUpdateSubmit = () => {
        axios.put(`http://localhost:5000/api/update/`, editDetail).then((res) => {
            const { message, success } = res.data;
            if (success) {
                swal({
                    text: message,
                    icon: "success"
                }).then((res) => {
                    setEmpData(res.data)
                })
            } else {
                swal({
                    text: message,
                    icon: "error"
                })
            }
        })
        setTimeout(() => {
            window.location.reload(false);
        }, 1000);
    }
    const getEmployeeData = () => {
        axios.get(apis.getEmployee)
            .then((res) => setEmpData(res.data));
    }
    useEffect(() => {
        getEmployeeData();
    }, []);

    const deleteData = () => {
        axios.delete(`http://localhost:5000/api/delete/${deleteId}`).then((res) =>{
            const { message, success } = res.data;
            if (success) {
                swal({
                    text: message,
                    icon: "success"
                }).then((res) => {
                    setEmpData(res.data)
                    window.location.reload(false);
                })
            }
        })
    }
    const handleChange = (e) => {
            const { name, value } = e.target;
            setEditDetail({ ...details, [name]: value });
        }
        const remove = () => {
            setOpenDetail(false);
        }
        return (
            <>
            <Form passData={empData} />
            <DChart setDataThroughDChart={setEmpData}/>
            {/* <DonutChartComp setDataThroughDChart={setEmpData}/> */}
                    <Paper className='style'>
                        <DataGrid
                            rows={empData}
                            getRowId={(row) => row._id}
                            columns={columns}
                            pageSize={8}
                            rowsPerPageOptions={[8]}
                            checkboxSelection
                            onSelectionModelChange={itm => setDeleteId(itm)}
                            disableSelectionOnClick
                            experimentalFeatures={{ newEditingApi: true }}          
                        />
                    </Paper>
                <Modal
                    open={opendetail}>
                    <Box sx={style}>
                        <Typography>update Data Form</Typography>
                        <Typography sx={{ mt: 2 }}>
                        </Typography>
                        <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
                            <CardContent>
                                <form>
                                    <Grid container spacing={1} >
                                        <Grid xs={12} item>
                                            <TextField label="Name" name="name" placeholder="Enter name" fullWidth defaultValue={details.name} onChange={(e) => handleChange(e)} ></TextField>
                                        </Grid>
                                        <Grid xs={12} item>
                                            <TextField label="Email" name="email" placeholder="Enter Email Id" fullWidth defaultValue={details.email} onChange={(e) => handleChange(e)}></TextField>
                                        </Grid>
                                        <Grid xs={12} item>
                                            <TextField label="Phone" name="phone" placeholder="Enter Phone Number" fullWidth defaultValue={details.phone} onChange={(e) => handleChange(e)}></TextField>
                                        </Grid>
                                        <Grid xs={12} item>
                                            <TextField label="Address" name="address" placeholder="Enter your Address" fullWidth defaultValue={details.address} onChange={(e) => handleChange(e)}></TextField>
                                        </Grid>
                                        <Grid xs={12} item>
                                            <TextField label="Department" name="department" placeholder="Enter your Department" fullWidth defaultValue={details.department} onChange={(e) => handleChange(e)}></TextField>
                                        </Grid>
                                        <Grid xs={12} item>
                                            <TextField label="Company" name="company" placeholder="Enter your company" fullWidth defaultValue={details.company} onChange={(e) => handleChange(e)}></TextField>
                                        </Grid>
                                    </Grid>
                                    <div className="btn-2 button-adjustment">
                                        <Button variant="contained" color="success" fullWidth onClick={handleUpdateSubmit}>Submit</Button>

                                        <Button variant="contained" fullWidth onClick={remove} className="btnStyle">Cancel</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </Box>
                </Modal>
            </>
        );
    }