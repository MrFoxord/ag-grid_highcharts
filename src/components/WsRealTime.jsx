import React from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket'
import WsChart from './WsChart.jsx';
import {useState,useEffect,useRef} from 'react'
import { Select,MenuItem,InputLabel,TextField,Typography,Button,FormControl,FormControlLabel,FormLabel,RadioGroup,Radio, Collapse,Alert,IconButton,Stack } from '@mui/material';
import AsyncSelect from 'react-select/async';

export default function WsRealTime(){
    const [writenTime,setWritneTime]=useState(0);
    const [timestate,setTimeState]=useState(1000);  
    const [testUrl,setTestUrl]=useState('wss://ws.eodhistoricaldata.com/ws/');
    const [token,setToken]=useState('demo')
    const [dataForBD,setDataFrorBD]=useState([])
    const [dataForChart,setDataFrorChart]=useState([])
    const [warning,setWarning]=useState(true)
    const [typeWarning,setTypeWarning]=useState('warning')
    const [textWarning,setTextWarning]=useState('Wait until service will connecti ')
    const [chartTicker,setChartTicker]=useState('nothing')
    const [wsTicker,setWsTicker]=useState('')
    const [preview,setPreview]=useState('')
    const [feed,setFeed]=useState('us?api_token=');
    const [prevTicker,setPrevTicker]=useState('')
    const [buttonText,setButtonText]=useState('choose for subcribe')
    const {sendJsonMessage}=useWebSocket(testUrl+feed+token,{
        onOpen:()=>{
            
           
        },
        onMessage:(message)=>{
          const parsedData=JSON.parse(message.data)
          
            if(parsedData.message==='Authorized'){
              console.log('SUCCESS CONNECTING!');
              changeWarning('success','Connection complete',true)
              

            }
            else{
              if(parsedData.t!==undefined){
                if(parsedData.t>(parseInt(timestate,10)+writenTime)){
                let newData=dataForChart
                console.log('new data')
                console.log(parsedData.t)
                newData.push({x:parsedData.t,y:parsedData.p})
                if(newData.length>4000){
                  newData.shift()
                  console.log(newData[newData.length-1])
                }
                setDataFrorChart(newData)
                
              
                setWritneTime(parsedData.t)
                const sendData=dataForBD;
                sendData.push(parsedData)
                setChartTicker(parsedData.s)
                setDataFrorBD(sendData)
                }
              }else{
                console.log('something going wrong',parsedData)
                changeWarning('error',`oops ${parsedData.message}`,true)
               
              }
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

    const LoadOption = (inputText) => {
      const neededTicker=inputText.toUpperCase()
      const url = 'http://62.216.47.4:21005/api/sec_data_tickers';
      return fetch(`${url}?ticker=` + neededTicker).then(r => r.json()).then(result => {
        return (result.data.map(oneResult => { 
          return ({ value: oneResult.ticker, label: oneResult.ticker }) }))
      })
    }
    function unsubscribeTicker(){
      if(prevTicker!==''){
        console.log('unsubscribe')
        sendJsonMessage({
          action:'unsubscribe',
          symbols:prevTicker
        })
        setPrevTicker('')
      }

    }
    function realTimeSubscribe(){
      console.log('prevticker',prevTicker);
      console.log('ws ticker',wsTicker)
     
      if(prevTicker===''){
        console.log('proc first time')
      }
      if(prevTicker!==''){
        console.log('after first time')
        sendJsonMessage({
          action:'unsubscribe',
          symbols:prevTicker
        })

      }
        setPrevTicker(wsTicker)
      setDataFrorChart([])  
      
      sendJsonMessage({
        action:'subscribe',
        symbols:wsTicker
      })
      console.log('prev ticker after sending',prevTicker)
    }

    function changeFeed(event){
      setWsTicker('')
      setFeed(event.target.value);
     
    }

    function changeWarning(type,text,status){
      setTypeWarning(type)
      setTextWarning(text);
      setWarning(status)
    }

    useEffect(()=>{
      setPreview(`now we see ${chartTicker}`);
      console.log('chartTicker is',chartTicker)
    },[chartTicker])
    useEffect(()=>{
      console.log('prev ticker now',prevTicker)
    },[prevTicker])
    useEffect(()=>{
      if(wsTicker!==''){
      setButtonText(`subscribe to ${wsTicker}`)}
    },[wsTicker])
    return (
            <div>
              <h1>WebSocket test</h1>
              
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

              <WsChart chartData={dataForChart} ticker={chartTicker}/>

              <Stack direction='row'>
                <Button 
                  onClick={()=>{
                    changeWarning('info',`Subscribe to ${wsTicker}`,true)
                    setButtonText('chhose ticker for subscribe');
                    realTimeSubscribe()}} 
                  variant="contained"> {buttonText}</Button>
                <Typography variant="button"  style={{marginLeft:'20px'}}>
                  {preview}
                </Typography>
              </Stack>
              <Button 
                variant="contained" 
                onClick={()=>{
                  unsubscribeTicker()
                  setWsTicker('')
                  changeWarning('info','Unsubscribe success',true)
                }}
                style={{marginTop:'15px'}}>
                Unsubscribe
              </Button>
              
              <h2>Options</h2>

              <Stack direction='row'>
                <div style={{marginLeft:'20px'}}>
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

                <div style={{marginLeft:'20px'}}>
                  <Stack direction='column'>
                    <Typography variant="button">
                      reserved place
                    </Typography>
                    <InputLabel id='feedId'>
                      choose needed feed
                    </InputLabel>
                    <Select 
                      labelId='feedId'
                      id='feedSelect'
                      value={feed}
                      onChange={(e)=>{changeFeed(e)}}
                    >
                          <MenuItem value={'us?api_token='}>US trade</MenuItem>
                          <MenuItem value={'us-quote?api_token='}>US quote</MenuItem>
                          <MenuItem value={'forex?api_token='}>FOREX</MenuItem>
                          <MenuItem value={'crypto?api_token='}>Cryptocurrencies</MenuItem>
                    </Select>

                    <Typography variant="button" style={{marginTop:'10px'}}>
                      Choose ticker
                    </Typography>
                    <AsyncSelect
              
                      defaultOptions
                      loadOptions={LoadOption}
                      cacheOptions
                      onChange={(e) => {
                        unsubscribeTicker()
                        console.log('change ticker',e.value)
                        setWsTicker(e.value)
                      }
                      }
                    />

                    <Typography variant="button" style={{marginTop:'10px'}}>
                      Choose token
                    </Typography> 
                    <TextField 
                      variant='outlined' 
                      value={token} 
                      onChange={(e)=>{setToken(e.target.value)}}
                    />

                  </Stack>
                  
                </div>
              </Stack>
            </div>
    )
}