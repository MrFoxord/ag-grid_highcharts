import React from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";


export default function UsTrades(props){

    const {sendJsonMessage}=useWebSocket(props.feed,{
        onMessage:()=>{
            console.log('open successfull');
        }
    })

    return (
        <div>
            <h1>US-TRADES</h1>
            <h2>{props.feed}</h2>
        </div>
    )
}