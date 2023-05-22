import React from "react";
import UsQuotes from "./UsQuotes.jsx";
import UsTrades from "./UsTrades.jsx";
import Forex from "./Forex.jsx";
import { Select,InputLabel,MenuItem } from "@mui/material";
import { useState,useEffect } from "react";


export default function RealTimeFeeds(){
    const [feed,setFeed]=useState('us?api_token=')
    const wsUrl='wss://ws.eodhistoricaldata.com/ws/'
    const [fullUrl,setFullUrl]=useState(`${wsUrl}${feed}`);
    function changeFeed(){
        switch(feed){
            case 'us?api_token=':
                return <UsTrades feed={fullUrl}/>
            case 'us-quote?api_token=':
                return <UsQuotes feed={fullUrl}/>
            case 'forex?api_token=':
                return <Forex feed={fullUrl}/>
            default:
                break;
        }
    }
useEffect(()=>{
    setFullUrl(wsUrl+feed);

},[feed])

    return (
        <div>
            <InputLabel
                id='feedId'>
            Choose needed feed
            </InputLabel>
            <Select 
            labelId='feedId'
            id='feedSelect'
            value={feed}
            onChange={(e)=>{setFeed(e.target.value)}}>
            
                <MenuItem value={'us?api_token='}>US trade</MenuItem>
                <MenuItem value={'us-quote?api_token='}>US quote</MenuItem>
                <MenuItem value={'forex?api_token='}>FOREX</MenuItem>
            </Select>
            {changeFeed()}

        </div>
    )
}