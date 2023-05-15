import React from 'react';
import { useState,useEffect } from 'react';
import { TextField,Stack,Button, Collapse,Alert,IconButton,FormControl,RadioGroup,Radio,FormLabel,FormControlLabel } from '@mui/material';
import ReactDatePicker from 'react-datepicker';
import AsyncSelect from 'react-select/async';
import "react-datepicker/dist/react-datepicker.css";
import { Dataset } from '@mui/icons-material';

export default function Parser(){
    const [dateTo,setDateTo]=useState(new Date())
    
    const [tickersPage,setTickersPage]=useState(1);
    const [warning,setWarning]=useState(false)
    const [finalCounter,setFinalCounet]=useState(1)
    const [nowLength,setNowLength]=useState(0)
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
    const [urlsForSending,setUrlsForSending]=useState([])

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
        setTickerUrl(`http://62.216.47.4:21005/api/sec_data_tickers?$skip=${(tickersPage-1)*1000}&$limit=1000`)

    },[tickersPage])

    useEffect(()=>{
        const dateString=dateTo.toString().split(' ');
        dateString[4]='23:00:00';
        setDateMiliTo(Date.parse(dateString.join(' ')))

    },[dateTo]);
    
    const parseNow=()=>{
        console.log('PARSING')
        
        let timeOfYears=diapYears*31536000000;
        let diapInCounts=Math.round(timeOfYears/interval);
        let localTo=dateMiliTo;
        let localFrom=dateMiliTo-interval;

        if(chosenTicker!==''){
            setTypeWarning('warning')
            setTextWarning('Taking data from historical base')
            setWarning(true)
            console.log('for ticker',chosenTicker.value)
            const parseUrlArray=[]

            for(let i=0;i<diapInCounts;i++){
                parseUrlArray.push(fetch(`${ourParsedUrl}${chosenTicker.value}?api_token=${token}&interval=1m&from=${Math.round((localTo-(interval*(i+1)))/1000)}&to=${Math.round((localTo-(interval*i))/1000)}&fmt=json`)
                    .then(r=>r.json()));
                const localArray=[]
                
                
            }
            console.log('we have our fetches');
            Promise.all(parseUrlArray).then(responces=>{
                let count=0;
                let equaling=responces.length
                setTypeWarning('warning')
                setTextWarning('Sending data to our DataBase')
                setWarning(true)
                const sendingToOurDB=[]
                const datasForDB=[]
                setFinalCounet(responces.length)
                responces.forEach(oneData=>{
                    const dataArray=[]
                    if(oneData.length>0){
                        console.log('Taken data success')
                        let j=0
                        oneData.forEach(everyData=>{
                            j=j+1
                            if(j===countInterval){
                                switch(countInterval){
                                    case 60:
                                        everyData.ticker=chosenTicker.value
                                        dataArray.push(everyData)
                                        break

                                    case 5:
                                        everyData.ticker=chosenTicker.value
                                        dataArray.push(everyData)
                                        break

                                    case 1:
                                        everyData.ticker=chosenTicker.value
                                        dataArray.push(everyData)
                                        break

                                    default:
                                        break
                                }
                                j=0
                            }
                        })
                        datasForDB.push(dataArray)
                        console.log('here we send data',dataArray);
                        fetch(dbUrl,{
                            method:'POST',
                            headers: {
                                'Content-type': 'application/json',
                              },
                            body:JSON.stringify(dataArray)
                        })
                    }
                    else{
                        console.log('failed to take data')
                        count++;
                    }
                    
                })
                
                if(count!==equaling){
                    console.log('full ask success')
                    console.log('count',count);
                    console.log('equal',equaling)
                    setTypeWarning('success')
                    setTextWarning('Data sended')
                }
                else{
                    console.log('full fail')
                    console.log('count',count);
                    console.log('equal',equaling)
                    setTypeWarning('error')
                    setTextWarning('No data about this ticker in EOD')
                }

            })
        
        }
        else {
            console.log('dont choose ticker')
            setTypeWarning('error')
            setTextWarning('Ticker was not chosen')
            setWarning(true)
        }
    }

    function sendingToUrl(datas,from,to){
         console.log('sending to our DB')
    }
    
    useEffect(()=>{
        switch(choiceInterval){
            case '1hour':
                console.log('choose 1 hour')
                setUrlInterval('1h')
                setCountInterval(60)
                break
            case '5min':
                console.log('choose 5 minutes')
                setUrlInterval('5m')
                setCountInterval(5)
                break
            case '1min':
                console.log('choose 1 minute')
                setUrlInterval('1m')
                setCountInterval(1)
                break
            default:
                break
        }
    },[choiceInterval])
    useEffect(()=>{
        setWarning(false)
    },[])
    useEffect(()=>{
        if(nowLength===finalCounter){
            setWarning(true)
            setNowLength(0);
            finalCounter(1)
            setTypeWarning('success')
            setTextWarning('Data sended')
        }
    },[nowLength])
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