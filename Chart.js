import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import './login.css'
import { useState,useEffect } from 'react';
import axios from 'axios';

function DoughnutChart() {

    const [compData, setCompData] = useState([]);

    const Spraxa = compData.filter((item)=>item.company==="Spraxa Solution");
    const Strem4tech = compData.filter((item)=>item.company==="Stream4tech");
    const CoolR = compData.filter((item)=>item.company==="CoolR Group");
    
    const getDonutData = () =>{
        axios.get("http://localhost:5000/api/donut")
            .then((res) => setCompData(res.data));
    }
    useEffect(() => {
        getDonutData();
    }, []);

    const data = {
        labels: ['Spraxa','Stream4tech','CoolR'],
        datasets: [
            {
                data: [Spraxa.length,Strem4tech.length,CoolR.length],
                borderColor: ['rgba(255,206,86,0.2)'],
                backgroundColor: ['rgba(232,99,132,1)',
                'rgba(232,211,6,1)',
                'rgba(54,162,235,1)',
                 ],
                pointBackgroundColor: 'rgba(255,206,86,0.2)',
            }
        ]
    }
    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Doughnut Chart',
                color:'blue',
                font: {
                    size:34
                },
                padding:{
                    top:30,
                    bottom:30
                },
                responsive:true,
                animation:{
                    animateScale: true,
                               }
            }
        }
    }
    const handleclick = ()=>{
        console.log("Hello")
    }
   return (
      <div className='donut-style'>
          <Doughnut data={data} options={options} onClick={handleclick} />
      </div>
    )
}

export default DoughnutChart;