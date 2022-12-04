import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { apis } from "./Url";
import { TextField, MenuItem } from "@mui/material";

export default function DonutChartComp({setDataThroughDChart}) {
    const [compData, setCompData] = useState([]);
    const [detail, setDetail] = useState({ filter: 1 });

    const handleInputChange = (e) => {
        debugger
        const { name, value } = e.target;
        setDetail({ ...detail, [name]: value });
    }
    const Spraxa = compData.filter((item) => item.company === "Spraxa Solution");
    const Strem4tech = compData.filter((item) => item.company === "Stream4tech");
    const CoolR = compData.filter((item) => item.company === "CoolR Group");

    const handleClick = (event, chartContext, config) => {
            const label=config.w.config.labels[config.dataPointIndex];
            axios.post(apis.postDonut,{label}).then((res)=>{
                const{result} = res.data
                setDataThroughDChart(result)})
        }

    const [chartData, setChartData] = useState(
        {
        options: {
            labels:['Spraxa Solution', 'Stream4tech', 'CoolR Group'],
            chart: {
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
        },
    }
    );
   
    const getDonutData = () => {
        axios.get("http://localhost:5000/api/donut")
            .then((res) => setCompData(res.data));
    }

    useEffect(() => {
        getDonutData();
    }, []);
    return (
        <>
        <TextField name="filter" required className="filterStyle" value={detail.filter} onChange={handleInputChange}  select>
                    <MenuItem value={1} >Department</MenuItem>
                    <MenuItem value={2} >Company</MenuItem>
                </TextField>
       
            <div id="chart">
                <ReactApexChart  options={chartData.options} type="donut" width={380} labels= {chartData.options.labels} series={[Spraxa.length,Strem4tech.length,CoolR.length]}/>
            </div>
        
        </>
    )
}