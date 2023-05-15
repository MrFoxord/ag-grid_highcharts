import React from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';

export default function LoadRealTime(){
    const testUrl='wss://ws.eodhistoricaldata.com/ws/us?api_token=demo';
     const {sendJsonMessage,readyState}=useWebSocket(testUrl,{
        onOpen:()=>{
            console.log('SUCCESS CONNECTING!');
            sendJsonMessage({
                action: "subscribe", 
                symbols: "AAPL"
            })
            // setCounter(true)
        },
        onMessage:(message)=>{
            return ('olala')
               
                
        
        },
        share:true,
        filter:()=>false,
        retryOnError:false,
        shouldReconnect:()=>true,
    })
}