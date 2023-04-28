import React from 'react';
import AsyncSelect from 'react-select/async';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import { useState, useEffect } from 'react';
import { Stack, TextField, Button, Alert, IconButton, Collapse } from '@mui/material';
import ReactDatePicker from 'react-datepicker';

export default function Charts() {
  const chartUrl = 'http://62.216.47.4:21005/api/tickers_intraday_data?ticker='
  

  const [dateBegin,setDateBegin]=useState(oneMonthBefore())
  const [dateEnd,setDateEnd]=useState(new Date(Date.now()))
  
  const [lengthArray, setLengthArray] = useState({
    value: 0,
  })
  const [instate, setInstate] = useState({
    loading: false,
    dData: [],

  });

  const [warning, setWarning] = useState(false)
  const [ticker, setTicker] = useState('AAPL')
  const [temporArray, setTempArray] = useState([])

  const options1 = {
    credits: {
      text: 'My Credits',

    },
    chart: {
      width: 600,
      type: 'candlestick',
      zoom: 'x'
    },

    title: {
      text: 'Highcharts (open,close,high,low)'
    },
    rangeSelector: {
      enabled: true,
      allButtonsEnabled: true,
      floating: true,

      buttonTheme: {
        width: 200
      },
      buttons: [{
        type: 'hour',
        count: 1,
        text: 'hour'
      },
      {
        type: 'day',
        count: 1,
        text: '1d'
      },
      {
        type: 'month',
        count: 1,
        text: '1m'
      },
      {
        type: 'all',
        count: 1,
        text: 'All'
      }],
      selected: 4,
      inputEnabled: false
    },
    scrollbar: {
      enabled: true,

    },
    navigator: {
      enabled: true
    },

    series: [
      {
        name: 'Data',
        data: instate.dData,

        cropThreshold: 1000000

      },
    ],

    xAxis: {
      minRange: 3600 * 1000, // one hour
      type: 'datetime',
    },
  };

  function oneMonthBefore(){
    return(new Date(new Date(Date.now()).setMonth(new Date(Date.now()).getMonth()-1)))
  }

  function dateParseForFetch(date){
    const unparsedData=JSON.stringify(date).split('T')
    const parsedData=[]
    parsedData.push(unparsedData[0].slice(1));
    parsedData.push(unparsedData[1].slice(0,-3))
    console.log('inside parse date',parsedData.join(' '));
    return (parsedData.join(' '))
  }

  
  // Re-render of highchart
  useEffect(() => {
    fetch(chartUrl + ticker)
      .then(result => result.json())
      .then(jsonData => {
        const newData = []
        const dataLength = lengthArray
        dataLength.value1 = jsonData.data.length;
        jsonData.data.forEach(item => {
          const Ddate = new Date(((item.timestamp) * 1000));

          newData.push({ x: Ddate, open: item.open, high: item.high, low: item.low, close: item.close });
        });
        setInstate({ loading: false, dData: newData })
        setLengthArray(dataLength)
      })

    
  }, []);

 

  function changeChart (){
    console.log('DEBUG_____',ticker);
    
    const fullUrl=chartUrl+ticker;

    const from=dateParseForFetch(dateBegin);
    const to=dateParseForFetch(dateEnd);
    console.log('DEBUG 2',from)
    console.log('DEBUG 3',to)
    console.log('FULL URL:  ',`${fullUrl}&$limit=1000&datetime[$gte]=${from}&datetime[$lte]=${to}`)
    fetch(`${fullUrl}&$limit=1000&datetime[$gte]=${from}&datetime[$lte]=${to}`)
        .then(r=>r.json())
        .then(result=>{
            console.log('done in function',result)
            if(result.data.length>0){
                const newInstate=instate
                const total=result.total;
                let temporData=[];
                let fetchesArray=[];
                result.data.forEach(oneResult=>{
                    temporData.push({ 
                        x: (oneResult.timestamp) * 1000, 
                        open: oneResult.open, 
                        high: oneResult.high, 
                        low: oneResult.low, 
                        close: oneResult.close })
                })
                console.log('pushing after first fetch done');
                newInstate.dData=temporData
                setInstate(newInstate);
                if(total>1000){
                    for(let i=1;i<(total/1000);i++){
                        fetchesArray.push(`${fullUrl}&$limit=1000&$skip=${i*1000}&datetime[$gte]=${from}&datetime[$lte]=${to}`)
                    }
                    let fetchRequests=fetchesArray.map(oneFetch=>fetch(oneFetch).then(result=>{return result.json()}))
                    Promise.all(fetchRequests)
                        .then(response=>{
                            console.log('response of promisses',response)
                            response.forEach(oneResponse=>{
                                console.log('pushing to chart data of one fetch')
                                oneResponse.data.forEach(oneData=>{
                                    temporData.push({ 
                                        x: (oneData.timestamp) * 1000, 
                                        open: oneData.open, 
                                        high: oneData.high, 
                                        low: oneData.low, 
                                        close: oneData.close 
                                    })
                                })
                                
                            })
                            if(lengthArray.value===total){
                                temporData.unshift({ 
                                    x: new Date(result.data[0].date - 1000), 
                                    open: 0, 
                                    close: 0, 
                                    high: 0, 
                                    low: 0 
                                })
                            }
                            const newLength=lengthArray;
                            newLength.value=temporData.length;
                            newInstate.dData=temporData;
                            setInstate(newInstate);
                            setLengthArray(newLength);
                        })

                }
                console.log('finalArray', temporData)
            }
            else{
                setWarning(true)
            }
        })
  }

 


  const LoadOption = (inputText) => {
    console.log('LOAD OPTIOONS', inputText)
    const neededTicker=inputText.toUpperCase()
    const url = 'http://62.216.47.4:21005/api/sec_data_tickers';
    return fetch(`${url}?ticker=` + neededTicker).then(r => r.json()).then(result => {
      return (result.data.map(oneResult => { console.log('return', oneResult); return ({ value: oneResult.ticker, label: oneResult.ticker }) }))
    })



  }

  useEffect(() => {
    console.log('ticker is ', ticker)
    console.log('from',dateBegin)
    console.log('to',dateEnd);
    changeChart();
  }, [ticker,dateBegin,dateEnd])
  return (
    <div>
      <Collapse in={warning}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setWarning(false);
              }}
            >close
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Asked  ticker to chart without data in database
        </Alert>
      </Collapse>
      <Stack direction='row'>

        <div>
          <AsyncSelect
            
            defaultOptions
            loadOptions={LoadOption}
            cacheOptions
            onChange={(e) => {
              
              console.log('change ticker')
              setTicker(e.value.toUpperCase())
            }
            }
          />

          <Stack direction='row' style={{ paddingLeft: '10px' }}>
            <div style={{ paddingLeft: '10px' }}>
              <h5>set begin of taken datas</h5>
              <ReactDatePicker
                selected={dateBegin} 
                onChange={(date) => {
                  setDateBegin(date) 
                  }} />
            </div>
            <div style={{ paddingLeft: '20px' }}>
              <h5>set end of taken datas</h5>
              <ReactDatePicker 
              selected={dateEnd} 
              onChange={(date) => { 
                setDateEnd(date) 
                }} />
            </div>

          </Stack>


          <HighchartsReact
            highcharts={Highcharts}
            options={options1} />

        </div>
      </Stack>
    </div>
  )

}