import React from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";


export default function UsQuotes(props){

    return(
    <div>
        <h1>US-QUOTES</h1>    
        <h2>{props.feed}</h2>
    </div>
)
}