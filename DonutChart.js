import React from "react";
import axios from "axios";
import { useEffect } from "react";
import {MenuItem,  TextField } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";

import {apis} from "./Url";

export default function DChart({setDataThroughDChart}) {
    const [empData, setEmpData] = React.useState([]);
    const [detail, setDetail] = useState({ filter: 1 });
    const handleInputChange = (e) => {
        debugger;
        const { name, value } = e.target;
        setDetail({ ...detail, [name]: value });
        // console.log(e.target);
    }
    const Software = empData.filter((item) => item.department === "Software");
    const Hardware = empData.filter((item) => item.department === "Hardware");
    const Sales = empData.filter((item) => item.department === "Sales");
    const Spraxa = empData.filter((item) => item.company === "Spraxa Solution");
    const Strem4tech = empData.filter((item) => item.company === "Stream4tech");
    const CoolR = empData.filter((item) => item.company === "CoolR Group");

    const handleClick = (event, chartContext, config) => {
        const pathId = document.getElementById(event.target.id);
        const dValue = pathId.attributes["selected"].value;
        if(dValue === "true"){
            // debugger
        let id = config.w.config.chart.id;
        const label=config.w.config.labels[config.dataPointIndex];
        axios.post(apis.postDonut,{label,id}).then((res)=>{
            const{result} = res.data
            setDataThroughDChart(result)});
        }else{
            axios.get(apis.getDonut)
            .then((res) =>{
                setDataThroughDChart(res.data);
            });
        }
    }
    const companyOption ={
         options: {
            labels:['Spraxa Solution', 'Stream4tech', 'CoolR Group'],
            chart: {
                id: 'companyId',
                width: 380,
                type: 'donut',
                events: {dataPointSelection: handleClick},
            },
            dataLabels: {
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        show: false
                    }
                }
            }],
            legend: {
                position: 'right',
                offsetY: 0,
                height: 230,
            }
        }
    }
    const [chartData, setChartData] = useState({companyOption});
    const depOption ={
        option: {
           labels:['Software', 'Hardware', 'Sales'],
           chart: {
            id: 'departmentId',
               width: 380,
               type: 'donut',
               events: {dataPointSelection: handleClick}
           },
           dataLabels: {
           },
           responsive: [{
               breakpoint: 480,
               options: {
                   chart: {
                       width: 200
                   },
                   legend: {
                       show: false
                   }
               }
           }],
           legend: {
               position: 'right',
               offsetY: 0,
               height: 230,
           }
       }
   }
   const [depChartData, setDepChartData] = useState({depOption});
    const getDonutData = () => {
        axios.get(apis.getDonut)
            .then((res) =>{
                setEmpData(res.data);
            });
    }
    useEffect(() => {
        getDonutData();
    }, []);
    return (
        <>
            <div>
                <TextField name="filter" required className="filterStyle" value={detail.filter} onChange={handleInputChange}  select>
                    <MenuItem value={1} >Company</MenuItem>
                    <MenuItem value={2} >Department</MenuItem>
                </TextField>
            </div>
            { detail.filter===1 ? 
             <div>
            <ReactApexChart className="chartStyle"  options={chartData.companyOption.options} type="donut" width={450} labels= {chartData.companyOption.options.labels} series={[Spraxa.length,Strem4tech.length,CoolR.length]}/>
        </div> :
         <div >
            <ReactApexChart className="chartStyle" options={depChartData.depOption.option} type="donut" width={450} labels= {depChartData.depOption.option.labels} series={[Software.length,Hardware.length,Sales.length]}/>
        </div>
            }
            
        </>
    );
}