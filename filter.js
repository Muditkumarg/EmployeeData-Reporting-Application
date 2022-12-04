import React, { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import { Select } from "@mui/material";
import './login.css'
import { useNavigate } from "react-router-dom";

export default function FilterNav() {

    const navigate = useNavigate();
    const [detail,setDetail] = useState();
    const handleInputChange = (e) => {
        const{name,value} = e.target;
        setDetail({...detail,[name]:  value})
        console.log(e.target.value)
      //  navigate('/DonutChartComp')
    }
    return (
        <>
            <Select name="filter" label="Filter" className="filterStyle" placeholder="Filter" onChange={handleInputChange}>
                <MenuItem value="" disabled>Filter</MenuItem>
                <MenuItem value={1} >Department</MenuItem>
                <MenuItem value={2}  >Company</MenuItem>
            </Select>
        </>
    )
}