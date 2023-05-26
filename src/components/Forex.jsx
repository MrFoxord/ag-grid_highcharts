import React from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import {useState,useEffect} from 'react'
import { Button,TextField,Stack,Collapse,Alert,IconButton,InputLabel,Select,MenuItem } from "@mui/material";
import AsyncSelect from 'react-select/async';

import UsQuotesChart from "./UsQuotesChart.jsx";

export default function Forex(props){

    const [dataArray,setDataArray]=useState([])
    const [ticker,setTicker]=useState('')
    const [lastTick,setLastTick]=useState(0)
    const [prevTicker,setPrevTicker]=useState('')
    const [chartTicker,setChartTicker]=useState('')
    const [warning,setWarning]=useState(true)
    const [typeWarning,setTypeWarning]=useState('warning')
    const [textWarning,setTextWarning]=useState('Wait until service will connect ')
    const [textButton,setTextButton]=useState('choose ticker for reading')
    const [typeChart,setTypeChart]=useState('both')

    const {sendJsonMessage}=useWebSocket(props.feed+props.token,{
        onOpen:()=>{
            console.log('open successfull');
            changeWarning('success','Connection success',true)
        },
        
        onMessage:(message)=>{
            //console.log(message)
            const parsedMessage=JSON.parse(message.data)
            const newDataArray=dataArray;
            let oneBit={}
            if(parsedMessage.t!==undefined){
                if(newDataArray.length>0){
                    if(parsedMessage.t>(parseInt(lastTick,10)+props.interval)){
                        console.log(parsedMessage)
                        if(parsedMessage.dc>1){
                            oneBit={
                                x:parsedMessage.t,
                                open:parsedMessage.a,
                                close:parsedMessage.b,
                                high:parsedMessage.a,
                                low:parsedMessage.b
                            }
                        }
                        else{
                            oneBit={
                                x:parsedMessage.t,
                                open:parsedMessage.a,
                                close:parsedMessage.b,
                                low:parsedMessage.b,
                                high:parsedMessage.a
                            }
                        }
                        newDataArray.push(oneBit)
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
            <h1>FOREX</h1>
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
                <div><InputLabel
                        id='tickerId'>
                    Write needed ticker
                    </InputLabel>
                <TextField
                    labelId='tickerId' 
                    variant='outlined'
                    value={ticker}
                    style={{maxWidth:'150px'}} 
                    onChange={(e)=>{setTicker(e.target.value)}}
                    />
                </div>
                <div style={{marginLeft:'15px'}}>
                    <InputLabel
                        id='selectId'>
                    Choose needed datas
                    </InputLabel>
                    <Select 
                        labelId='selectId'
                        id='feedSelect'
                        value={typeChart}
                        onChange={(e)=>{setTypeChart(e.target.value)}}
                        style={{width:'180px'}}>
                        
                            <MenuItem value={'both'}>Ask and Bid price</MenuItem>
                            <MenuItem value={'ask'}>Ask price</MenuItem>
                            <MenuItem value={'bid'}>Bid price</MenuItem>

                        </Select>
                </div>
                
                <Button onClick={()=>{realTimeSubscribe()}}  variant="contained" style={{marginLeft:'15px'}} >{textButton}</Button>
            </Stack>
            <UsQuotesChart data={dataArray} ticker={chartTicker} type={typeChart}/>
        </div>
    )
}