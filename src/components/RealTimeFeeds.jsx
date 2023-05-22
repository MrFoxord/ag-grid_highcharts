import React from "react";
import UsQuotes from "./UsQuotes.jsx";
import UsTrades from "./UsTrades.jsx";
import Forex from "./Forex.jsx";
import { Select,InputLabel,MenuItem,TextField,Typography,Stack,FormControl,FormLabel,RadioGroup,FormControlLabel,Radio } from "@mui/material";
import { useState,useEffect } from "react";


export default function RealTimeFeeds(){
    const [feed,setFeed]=useState('us?api_token=')
    const [token,setToken]=useState('demo')
    const [timestate,setTimeState]=useState(1000);  

    
    const wsUrl='wss://ws.eodhistoricaldata.com/ws/'
    const [fullUrl,setFullUrl]=useState(`${wsUrl}${feed}`);
    function changeFeed(){
        switch(feed){
            case 'us?api_token=':
                return <UsTrades feed={fullUrl} token={token} interval={timestate}/>
            case 'us-quote?api_token=':
                return <UsQuotes feed={fullUrl} token={token} interval={timestate}/>
            case 'forex?api_token=':
                return <Forex feed={fullUrl} token={token} interval={timestate}/>
            default:
                break;
        }
    }
useEffect(()=>{
    setFullUrl(wsUrl+feed);

},[feed])

    return (
        <div>
            <Stack direction='row' style={{marginTop:'15px'}}>
                <div style={{marginLeft:'15px'}}>
                    <InputLabel
                        id='feedId'>
                    Choose needed feed
                    </InputLabel>
                    <Select 
                    labelId='feedId'
                    id='feedSelect'
                    value={feed}
                    onChange={(e)=>{setFeed(e.target.value)}}
                    style={{width:'150px'}}>
                    
                        <MenuItem value={'us?api_token='}>US trade</MenuItem>
                        <MenuItem value={'us-quote?api_token='}>US quote</MenuItem>
                        <MenuItem value={'forex?api_token='}>FOREX</MenuItem>
                    </Select>
                </div>
                <div style={{marginLeft:'15px'}}>
                    <Typography>
                        Choose needed token
                    </Typography>
                    <TextField 
                      variant='outlined' 
                      value={token} 
                      onChange={(e)=>{setToken(e.target.value)}}
                    />   
                </div>
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
            </Stack>
            {changeFeed()}

        </div>
    )
}