import React from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import {useState,useEffect,useRef} from 'react'
import { Button,FormControl,FormControlLabel,FormLabel,RadioGroup,Radio } from '@mui/material';

export default function WsTest(){
    const [writenTime,setWritneTime]=useState(0);
    const [timestate,setTimeState]=useState(1000); 
    const chartRef=useRef(null)
    const testUrl='wss://ws.eodhistoricaldata.com/ws/us?api_token=demo';
    const [counter,setCounter]=useState(false)
    const [testArray,setTestArray]=useState([])
    const [mCounter,setMCounter]=useState(8)
    const [j,setJ]=useState(4);
    const [dates,setDate]=useState([])
    const [test,setTest]=useState([])
    const {sendJsonMessage,readyState}=useWebSocket(testUrl,{
        onOpen:()=>{
            console.log('SUCCESS CONNECTING!');
           //console.log('contol test',test)
            // setCounter(true)
        },
        onMessage:(message)=>{
          // console.log('new onmessage')
          
          const parsedData=JSON.parse(message.data)
          // console.log('we have',new Date(parsedData.t));
          // console.log('Date before',new Date(writenTime))
          
            if(parsedData.message==='Authorized'){
              //console.log(parsedData.message)
              sendJsonMessage({
                action: "subscribe", 
                symbols: "TSLA"
              });
              //console.log('sended TSLA subscribe')
            }
          
            if(parsedData.t>(parseInt(timestate,10)+writenTime)){
              let someTest=test
              someTest.push({x:parsedData.t,y:parsedData.p})
              setTest(someTest)
              renderNewPoint(parsedData)
              console.log('proc')
              console.log('test',test)
            }
            else{
              console.log('non=proc',parsedData.t-(parseInt(timestate,10)+writenTime))
              //console.log(typeof(parsedData.t))
              //console.log(typeof(timestate))
              //console.log(typeof(writenTime))
            }
                
        
        },
        onClose:()=>{
          console.log('connection was closed')
        },
        share:true,
        filter:()=>false,
        retryOnError:false,
        shouldReconnect:()=>true,
    })

    // useEffect(()=>{
    //     if(counter===true){
    //         sendJsonMessage({
    //             action: "subscribe", 
    //             symbols: "AAPL"
    //         })
    //         setCounter(false);
    //     }
    // },[counter])

    
    const options1 = {
        credits: {
          text: 'My Credits',
    
        },
        chart: {
            zoom: 'x',
        },
    
        title: {
          text: 'Real-time test'
        },
        
        scrollbar: {
          enabled: true,
    
        },
        navigator: {
          enabled: true
        },
        
    
        series: [
          {
            name: 'Data',
            data:  dates,
    
    
          },
        ],
        xAxis: {
          type: 'datetime',
        },
    
       
      };
    
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         console.log('URARA')
    //        chartRef.current.chart.series[0].addPoint([(new Date()).getTime(),Math.round(Math.random()*100)/100],true,true) 
    //     },10000)
    // })
  
    

    function renderNewPoint(point){
      //console.log('called render new point')
      const newTime=point.t;
      const newVal=point.p;
      const newArr=dates;
      newArr.push({x:newTime,y:newVal});
      chartRef.current.chart.series[0].setData(newArr,true,true,true)
      setDate(newArr)
      setWritneTime(newTime);
      //console.log('called with',dates)

    }

    return (
            <div>
            <h1>WebSocket test</h1>
            <HighchartsReact
            ref={chartRef}
            highcharts={Highcharts}
            options={options1} />

            <FormControl>
              <FormLabel id='change-delay-time'> Set interval</FormLabel>
              <RadioGroup
                aria-labelledby="change-delay-time"
                defaultValue={1000}
                name="radio-buttons-group"
                onChange={(e)=>{setTimeState(e.target.value)}}
              >
                <FormControlLabel value={parseInt(1000,10)} control={<Radio />} label="1 second" />
                <FormControlLabel value={parseInt(5000,10)} control={<Radio />} label="5 seconds" />
                <FormControlLabel value={parseInt(10000,10)} control={<Radio />} label="10 seconds" />
              </RadioGroup>
            </FormControl>
        </div>
    )
}