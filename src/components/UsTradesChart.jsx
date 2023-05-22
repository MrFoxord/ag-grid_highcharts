import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import { useState,useEffect } from 'react';


export default function UsTradesChart(props){
    const [dataArray,setDataArray]=useState([])
    const [ticker,setTicker]=useState('')

    const options= {
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
            data:  dataArray,
            
            cropThreshold: 1000000
    
    
          },
        ],
        xAxis: {
          type: 'datetime',
          minRange: 5 * 1000,
        },
    
       
      };

    useEffect(()=>{
        const newArray=props.data.map(oneData=>oneData);
        setDataArray(newArray)
    },[props.data[props.data.length-1]])


    useEffect(()=>{
        setTicker(props.ticker)
    },[props.ticker])

    return(
        <HighchartsReact options={options} highcharts={Highcharts}/>
    )
}