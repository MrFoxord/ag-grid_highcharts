import React from 'react';
import {useState,useEffect,useRef} from 'react'
import { Button,FormControl,FormControlLabel,FormLabel,RadioGroup,Radio } from '@mui/material';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'

export default function WsChart(props){
    
    const startDates=[1,1]
    const chartRef=useRef(null)
    const [chartData,setChaerData]=useState(startDates)
    const [ticker,setTicker]=useState('')
    const [listener,setListener]=useState([[1,1]])
    const options1 = {
        credits: {
          text: 'My Credits',
    
        },
        chart: {
            zoom: 'x',
        },
    
        title: {
          text: 'Watch ticker in real time'
        },
        
        scrollbar: {
          enabled: true,
    
        },
        navigator: {
          enabled: true
        },
        
    
        series: [
          {
            name: ticker,
            data:  chartData,
            
            cropThreshold: 1000000
    
    
          },
        ],
        xAxis: {
          type: 'datetime',
        },
    
       
      };
    useEffect(()=>{
      //console.log('we have income data',props.chartData.length)
      const someChart=props.chartData.map(oneData=>{return oneData})
        setChaerData(someChart)
      
      
    },[props.chartData[props.chartData.length-1]])
    //   
    //   chartRef.current.chart.series[0].setData(newArray,true,true,true)
  
   
    if(ticker!==props.ticker){
      setTicker(props.ticker)}
    return(
        <div>
        <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        options={options1} />

       
    </div>

    )
}