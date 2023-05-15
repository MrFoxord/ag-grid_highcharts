import React from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import {useState,useEffect,useRef} from 'react'
export default function WsTest(){
    const chartRef=useRef(null)
    const testUrl='wss://ws.eodhistoricaldata.com/ws/us?api_token=demo';
    const [counter,setCounter]=useState(false)
    const [testArray,setTestArray]=useState([])
    const [mCounter,setMCounter]=useState(8)
    const[j,setJ]=useState(4);
    const [data,setData]=useState([])
    const {sendJsonMessage,readyState}=useWebSocket(testUrl,{
        onOpen:()=>{
            console.log('SUCCESS CONNECTING!');
           
            // setCounter(true)
        },
        onMessage:(message)=>{
          console.log('data',message.data)
          const parsedData=JSON.parse(message.data)
          
            if(parsedData.message==='Authorized'){
              console.log(parsedData.message)
              sendJsonMessage({
                action: "subscribe", 
                symbols: "TSLA"
              })
            }
          
            if(parsedData.t!==undefined){
              console.log('pushing to chart')
            const newData=data;
            const x=parsedData.t;
            const y=parsedData.p;
            newData.push([x,y]);
            setData(newData);
            chartRef.current.chart.series[0].setData(data,true,true,true)
            console.log('data in onmessage',data)
          }
                
        
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
            data:  data,
    
    
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
  
    useEffect(()=>{
      console.log('data now is',data)
    },[data])
    function generic(){

                if(chartRef.current){
                const x=mCounter+1
                let y=Math.round(Math.random() * 10)
                console.log('x',x)
                console.log('y',y)
                const newData=data;
                newData.push([x,y])
                setData(newData)
                //chartRef.current.chart.series[0].addPoint([x,y],true,true)
                setMCounter(x)}
        

    }

    return (
            <div>
            <h1>WebSocket test</h1>
            <HighchartsReact
            ref={chartRef}
            highcharts={Highcharts}
            options={options1} />
            <button onClick={()=>{generic()}}>click</button>
        </div>
    )
}