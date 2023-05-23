import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import { useState,useEffect } from 'react';


export default function ForexChart(props){
    const [dataArray,setDataArray]=useState([])
    const [ticker,setTicker]=useState('')
    const [chartType,setChartType]=useState('candlestick')
    const [toolTipType,setToolTipType]=useState({
      useHTML:true,
      headerFormat: '<br><b style="colspan:2">{point.key}</b>',
      pointFormat: '<br><b style="color:green">ASK PRICE: {point.open}</b>' +
      '<br><b style="color:red">BID PRICE: {point.close}</b>',
      footerFormat: '</table>',
    })

    const options= {
        credits: {
          text: 'My Credits',
    
        },
        chart: {
            zoom: 'x',
            type:chartType,
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
        tooltip:toolTipType,
        
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
        const newArray=props.data.map(oneData=>{
          switch(props.type){
            case 'both':
              return oneData;
            case 'ask':
              return {x:oneData.x,y:oneData.open};
            case 'bid':
              return {x:oneData.x,y:oneData.close};
          }
          
        });
        setDataArray(newArray)
    },[props.data[props.data.length-1]])


    useEffect(()=>{
        setTicker(props.ticker)
    },[props.ticker])

    useEffect(()=>{
      switch(props.type){
        case 'both':
          setChartType('candlestick');
          setToolTipType({
            useHTML:true,
            headerFormat: '<br><b style="colspan:2">{point.key}</b>',
            pointFormat: '<br><b style="color:green">ASK PRICE: {point.open}</b>' +
            '<br><b style="color:red">BID PRICE: {point.close}</b>',
            footerFormat: '</table>',
          })
          break;
        case 'ask':
          setChartType('line');
          setToolTipType({
            useHTML:true,
            headerFormat: '<br><b style="colspan:2">{point.key}</b>',
            pointFormat: '<br><b style="color:green">ASK PRICE: {point.y}</b>',
          })
          break;
        case 'bid':
          setChartType('line');
          setToolTipType({
            useHTML:true,
            headerFormat: '<br><b style="colspan:2">{point.key}</b>',
            pointFormat: '<br><b style="color:red">BID PRICE: {point.y}</b>',
          })
          break;
        default:
          break;
      }
    },[props.type])
    return(
        <HighchartsReact options={options} highcharts={Highcharts}/>
    )
}