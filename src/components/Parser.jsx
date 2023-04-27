import React from 'react';
import { useState,useEffect } from 'react';
import { TextField,Stack,Button, Collapse,Alert,IconButton,FormControl,RadioGroup,Radio,FormLabel,FormControlLabel } from '@mui/material';
import ReactDatePicker from 'react-datepicker';
import AsyncSelect from 'react-select/async';
import "react-datepicker/dist/react-datepicker.css";

export default function Parser(){
    const [dateTo,setDateTo]=useState(new Date())
    const [dataArray,setDataArray]=useState([ 
        {
        "timestamp": 1671440400,
        "gmtoffset": 0,
        "datetime": "2022-12-19 09:00:00",
        "open": 136,
        "high": 136,
        "low": 135.5,
        "close": 135.58,
        "volume": 4241
    },
    {
        "timestamp": 1671440460,
        "gmtoffset": 0,
        "datetime": "2022-12-19 09:01:00",
        "open": 135.45,
        "high": 135.51,
        "low": 135.44,
        "close": 135.44,
        "volume": 1814
    },
    {
        "timestamp": 1671440520,
        "gmtoffset": 0,
        "datetime": "2022-12-19 09:02:00",
        "open": 135.54,
        "high": 135.54,
        "low": 135.47,
        "close": 135.47,
        "volume": 835
    },
    {
        "timestamp": 1671440580,
        "gmtoffset": 0,
        "datetime": "2022-12-19 09:03:00",
        "open": 135.46,
        "high": 135.46,
        "low": 135.31,
        "close": 135.37,
        "volume": 3063
    },
    {
        "timestamp": 1671440640,
        "gmtoffset": 0,
        "datetime": "2022-12-19 09:04:00",
        "open": 135.35,
        "high": 135.39,
        "low": 135.35,
        "close": 135.39,
        "volume": 1120
    },])
    const [tickersPage,setTickersPage]=useState(1);
    const [warning,setWarning]=useState(false)
    const [finalArray,setFinalArray]=useState('')
    const [typeWarning,setTypeWarning]=useState('success')
    const [textWarning,setTextWarning]=useState('')
    const [chosenTicker,setChosenTicker]=useState('')
    const [tickerUrl,setTickerUrl]=useState(`http://62.216.47.4:21005/api/sec_data_tickers?$limit=1000`)
    const [dateMiliTo,setDateMiliTo]=useState(Date.parse(Date.now()))
    const [diapYears,setDiapYears]=useState(1)
    const [dbUrl,setDbUrl]=useState('http://62.216.47.4:21005/api/tickers_intraday_data')
    const [token,setToken]=useState('634dc09228a344.50358931')
    const [interval,setInterval]=useState(10368000000);
    const [choiceInterval,setChoiseInterval]=useState('1h')
    const [urlInterval,setUrlInterval]=useState('1h')
    const [countInterval,setCountInterval]=useState(60)
    const strong_today=1681772400000;
    const today=new Date(Date.now());
    const [ourParsedUrl,setOurParsedUrl]=useState(`https://eodhistoricaldata.com/api/intraday/`)

    const LoadOption = (event)=>{
        console.log('in LoadOption',tickerUrl)
        return fetch(tickerUrl)
        .then(r=>r.json())
        .then(result=>{
            return (result.data.map(oneData=>{return ({value:oneData.ticker, label:oneData.ticker})}))
        })
    }
    
    useEffect(()=>{
        console.log('changed ticker to',chosenTicker)
    },[chosenTicker])
    useEffect(()=>{
        // console.log('change page to',tickersPage)
        setTickerUrl(`http://62.216.47.4:21005/api/sec_data_tickers?$skip=${(tickersPage-1)*1000}&$limit=1000`)

    },[tickersPage])

    useEffect(()=>{
        // console.log('changed to',dateTo)
        const dateString=dateTo.toString().split(' ');
        dateString[4]='23:00:00';
        // console.log('string is',dateString);
        // console.log('in miliseconds',Date.parse(dateString.join(' ')))
        // console.log('from string',new Date(Date.parse(dateString.join(' '))))
        setDateMiliTo(Date.parse(dateString.join(' ')))

    },[dateTo]);
    
    const parseNow=()=>{
        console.log('PARSING')
        // console.log('years',diapYears)
        
        let timeOfYears=diapYears*31536000000;
        // let globalDateTo=dateMiliTo-timeOfYears;
        let diapInCounts=Math.round(timeOfYears/interval);
        // console.log('counts',diapInCounts);
        // console.log('interval',interval)
        // console.log('trydiap',trydiap)
        let localTo=dateMiliTo;
        let localFrom=dateMiliTo-interval;
        if(chosenTicker!==''){
            setTypeWarning('warning')
            setTextWarning('Taking data from historical base')
            setWarning(true)
        console.log('for ticker',chosenTicker.value)
        for(let i=0;i<diapInCounts;i++){

            const localArray=[]
            // console.log('counts of cycle ask in db',i)
            // console.log('ticker',chosenTicker);
            // console.log('token',token);
            //  console.log('FOR FROM',new Date(Math.round((localFrom/1000)*1000)));
            //  console.log('TO',new Date(Math.round((localTo/1000)*1000)))
            // console.log('WE GET SOME DATA');
            
            
            fetch(`${ourParsedUrl}${chosenTicker.value}?api_token=${token}&interval=1m&from=${Math.round((localTo-(interval*(i+1)))/1000)}&to=${Math.round((localTo-(interval*i))/1000)}&fmt=json`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
                .then(result=> result.json())
                .then(result=>{
                    //console.log('result',result)
                    if(result.length!==0){
                        let j=0;
                        console.log('SUCCESS')
                        // console.log('interval 1',Math.round(interval*(i+1)))
                        // console.log('interval 2',Math.round(interval*(i)))
                        // console.log('from'+new Date(Math.round(localTo-(interval*(i+1)))))
                        // console.log('to ',new Date(Math.round(localTo-(interval*i))))
                    result.forEach(oneResult=>{
                        const intermedResult=oneResult;
                        j=j+1;
                        if(j==countInterval){
                           // console.log('proc count interval')
                            
                            switch (countInterval){
                                case 60:
                                    //console.log('count is one hour')
                                    intermedResult.ticker=chosenTicker.value
                                    localArray.push(intermedResult)
                                    break
                                case 5:
                                    //console.log('count is five minutes')
                                    intermedResult.ticker=chosenTicker.value
                                    localArray.push(intermedResult)
                                    break
                                case 1:
                                    //console.log('count is one one minute')
                                    intermedResult.ticker=chosenTicker.value
                                    localArray.push(intermedResult)
                                    break
                                default:
                                    break
                            }
                            j=0
                        }
                        //console.log('one data count',j)
                    })
                    
                    sendingToUrl(localArray,localFrom,localTo)
                }
                else{
                    console.log('UNSUCCESS')
                    // console.log('interval 1',Math.round(interval*(i+1)))
                    // console.log('interval 2',Math.round(interval*(i)))
                    // console.log('from'+new Date(Math.round(localTo-(interval*(i+1)))))
                    // console.log('to ',new Date(Math.round(localTo-(interval*i))))
                }
                   
                })
                // console.log('counter ',i)
                // console.log('interval 1',Math.round(interval*(i+1)))
                // console.log('interval 2',Math.round(interval*(i)))
                // console.log('interval 3',Math.round(interval*i))
            
            // console.log('here we have')
            // console.log('from'+new Date(Math.round(localTo-(interval*(i+1)))))
            // console.log('to ',new Date(Math.round(localTo-(interval*i))))
            
            // console.log('realTo',localTo)
            
            if(i==(diapInCounts-1)){
                setFinalArray(localArray)
             
         }
            
        }

        
        // console.log('our done data',localArray)
        // console.log('send to our server localarray')
       
        
        }
        else {
            console.log('dont choose ticker')
            setTypeWarning('error')
            setTextWarning('Ticker was not chosen')
            setWarning(true)
        }
    }

    function sendingToUrl(datas,from,to){
        // console.log(`at url ${ourParsedUrl}${chosenTicker.value}?api_token=${token}&interval=${urlInterval}&from=${Math.round(from/1000)}&to=${Math.round(to/1000)}&fmt=json`)
        console.log('sending to our DB')
        //console.log('datas',datas)
         fetch(`${dbUrl}`,{
                        method:'POST',
                        headers: {
                            'Content-type': 'application/json',
                          },
                          body:JSON.stringify(datas)
                    })
    }
    useEffect(()=>{
        setTypeWarning('warning')
        setTextWarning('Sending data to our DataBase')
        setWarning(true)
       
        
            setTypeWarning('success')
            setTextWarning('Data sended')
            setWarning(true)

    },[finalArray])
    useEffect(()=>{
        switch(choiceInterval){
            case '1hour':
                console.log('choose 1 hour')
                setUrlInterval('1h')
                //setInterval(31536000000)
                setCountInterval(60)
                break
            case '5min':
                console.log('choose 5 minutes')
                setUrlInterval('5m')
                //setInterval(31536000000)
                setCountInterval(5)
                break
            case '1min':
                console.log('choose 1 minute')
                setUrlInterval('1m')
                //setInterval(10368000000)
                setCountInterval(1)
                break
            default:
                break
        }
    },[choiceInterval])
    useEffect(()=>{
        setWarning(false)
    },[])
    return(
        <div>
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
                >
                close
                </IconButton>
            }
            sx={{ mb: 2 }}
            >
            {textWarning}
            </Alert>
        </Collapse>
        <Button variant='outlined' size='large' style={{marginTop:'30px'}} onClick={parseNow}>Parse</Button>
        <Stack direction='Row'>
            <Stack direction='column' > 
                <Stack direction='column' style={{margin:'10px'}}>
                    <h4>Date of endpoint for parse</h4>
                    <TextField 
                        variant='outlined' 
                        value={token} 
                        onChange={(e)=>{setToken(e.target.value)}}
                    />
                </Stack>
                <Stack direction='column' style={{margin:'10px'}}>
                    <h4>Years of needed period </h4>
                    <TextField 
                        variant='outlined'
                        type='number' 
                        value={diapYears}
                        style={{maxWidth:'100px'}} 
                        onChange={(e)=>{setDiapYears(e.target.value)}}
                    />
                </Stack>
                <Stack direction='column'style={{margin:'10px'}}>
                    <h4>Date of endpoint for parse</h4>
                    <ReactDatePicker selected={dateTo} onChange={(date)=>{setDateTo(date)}} />
                </Stack>
            </Stack>
            <Stack direction='column' style={{margin:'10px'}}>
                <h4>Page of teekers </h4>
                <TextField 
                    variant='outlined'
                    type='number' 
                    value={tickersPage}
                    style={{maxWidth:'100px'}} 
                    onChange={(e)=>{setTickersPage(e.target.value)}}
                    />

                <h4>Set interval </h4>
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Set interval</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="1hour"
                    name="radio-buttons-group"
                    onChange={(e)=>{setChoiseInterval(e.target.value)}}
                >
                    <FormControlLabel value="1hour" control={<Radio />} label="1 Hour" />
                    <FormControlLabel value="5min" control={<Radio />} label="5 minutes" />
                    <FormControlLabel value="1min" control={<Radio />} label="1 minute" />
                </RadioGroup>
                </FormControl>

            </Stack>
            <Stack direction='column' style={{margin:'10px'}}>
                <h4>Tickers </h4>
                <AsyncSelect
                    value={chosenTicker}
                    isSearchable
                    isLoading
                    defaultOptions
                    loadOptions={LoadOption}
                    
                    onChange={(e) => {
                    setChosenTicker(e)
                    }
                    }
                />
            </Stack>
            
        </Stack>
        
        </div>
    )
}