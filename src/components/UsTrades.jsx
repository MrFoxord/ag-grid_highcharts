import React from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import {useState,useEffect} from 'react'
import { Button,TextField,Stack,Collapse,Alert,IconButton } from "@mui/material";
import AsyncSelect from 'react-select/async';

import UsTradesChart from "./UsTradesChart.jsx";

export default function UsTrades(props){

    const [dataArray,setDataArray]=useState([])
    const [ticker,setTicker]=useState('')
    const [lastTick,setLastTick]=useState(0)
    const [prevTicker,setPrevTicker]=useState('')
    const [chartTicker,setChartTicker]=useState('')
    const [warning,setWarning]=useState(true)
    const [typeWarning,setTypeWarning]=useState('warning')
    const [textWarning,setTextWarning]=useState('Wait until service will connect ')
    const [textButton,setTextButton]=useState('choose ticker for reading')

    const {sendJsonMessage}=useWebSocket(props.feed+props.token,{
        onOpen:()=>{
            console.log('open successfull');
            changeWarning('success','Connection success',true)
        },
        
        onMessage:(message)=>{
            //console.log(message)
            const parsedMessage=JSON.parse(message.data)
            const newDataArray=dataArray;
            if(parsedMessage.t!==undefined){
                if(newDataArray.length>0){
                    if(parsedMessage.t>(parseInt(lastTick,10)+props.interval)){
                        newDataArray.push({x:parsedMessage.t,y:parsedMessage.p})
                        if(newDataArray.length>4000){
                            newDataArray.shift();
                        }
                        setDataArray(newDataArray);
                        setChartTicker(parsedMessage.s)
                        setLastTick(parsedMessage.t)
                        
                    }
                }else{
                    setDataArray([{x:parsedMessage.t,y:parsedMessage.p}])
                }
            }
            if((parsedMessage.status_code!==200)&&(parsedMessage.status_code!==undefined)){
                changeWarning('error',`Some goes worng: ${parsedMessage.message}`,true)
            }

        },
        onClose:()=>{
            console.log('close connect')
        }

    })
    
    function unsubscribeTicker(){
        if(prevTicker!==''){
          //console.log('unsubscribe')
          sendJsonMessage({
            action:'unsubscribe',
            symbols:prevTicker
          })
          setPrevTicker('')
        }
  
    }


    function realTimeSubscribe(){
        // console.log('prevticker',prevTicker);
        // console.log('ws ticker',ticker)
   
       
        if(prevTicker!==''){
            //console.log('after first time')
            sendJsonMessage({
            action:'unsubscribe',
            symbols:prevTicker
            })
        }

        setPrevTicker(ticker)
        setDataArray([])  
    
        sendJsonMessage({
            action:'subscribe',
            symbols:ticker
        })
        changeWarning('info','start reading data',true)
        setTextButton('choose ticker to reading')
    }

    function changeWarning(type,text,status){
        setTypeWarning(type)
        setTextWarning(text);
        setWarning(status)
      }
    

    const LoadOption = (inputText) => {
        const neededTicker=inputText.toUpperCase()
        const url = 'http://62.216.47.4:21005/api/sec_data_tickers';
        return fetch(`${url}?ticker=` + neededTicker).then(r => r.json()).then(result => {
          return (result.data.map(oneResult => { 
            return ({ value: oneResult.ticker, label: oneResult.ticker }) }))
        })
      }

    return (
        <div>
            <h1>US-TRADES</h1>
            <Collapse in={warning}>
                <Alert
                  severity={typeWarning}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setWarning(false);
                      }}
                    >close</IconButton>
                  }
                  sx={{ mb: 2 }}>
                {textWarning}
                </Alert>
            </Collapse>
            <Stack direction='row' style={{marginLeft:'15px'}}>
                <AsyncSelect
              
                      defaultOptions
                      loadOptions={LoadOption}
                      cacheOptions
                      onChange={(e) => {
                        unsubscribeTicker()
                        console.log('change ticker',e.value)
                        setTicker(e.value)
                        setTextButton(`Click for reading ${e.value}`)
                      }
                      }
                    />
                <Button onClick={()=>{realTimeSubscribe()}}  variant="contained" style={{marginLeft:'15px'}} >{textButton}</Button>
            </Stack>
            <UsTradesChart data={dataArray} ticker={chartTicker}/>
        </div>
    )
}