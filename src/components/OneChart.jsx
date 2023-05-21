import React from 'react';
import AsyncSelect from 'react-select/async';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import { useState, useEffect } from 'react';
import { Stack, Alert, IconButton, Collapse } from '@mui/material';
import ReactDatePicker from 'react-datepicker';

export default function Charts() {
  const chartUrl = 'http://62.216.47.4:21005/api/tickers_intraday_data?ticker='
  
  const [stateInfoWarn,setStateInfoWarn]=useState(false)
  const [oneOfWarn,setOneOfWarn]=useState('info')
  const [textInfo,setTextInfo]=useState('Loading data')
  const [dateBegin,setDateBegin]=useState(oneMonthBefore())
  const [dateEnd,setDateEnd]=useState(new Date(Date.now()))
  
  const [lengthArray, setLengthArray] = useState({
    value: 0,
  })
  const [instate, setInstate] = useState([]);

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
        type: 'day',
        count: 7,
        text: '1 week'
      },
      {
        type: 'day',
        count: 14,
        text: '2 week'
      },
      {
        type: 'month',
        count: 1,
        text: '1 month'
      },
      {
        type: 'month',
        count: 2,
        text: '2 month'
      },
      {
        type: 'month',
        count: 6,
        text: '6 month'
      },
      {
        type: 'year',
        count: 1,
        text: '1 year'
      },
      {
        type: 'years',
        count: 2,
        text: '2 years'
      },
      {
        type: 'year',
        count: 5,
        text: '5 years'
      },
      {
        type: 'all',
        count: 1,
        text: 'All'
      }],
      selected: 10,
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
        data: instate,

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
        setInstate(newData)
        setLengthArray(dataLength)
      })

    
  }, []);

 

  function changeChart (){
    //console.log('DEBUG_____',ticker);
    
    const fullUrl=chartUrl+ticker;

    const from=dateParseForFetch(dateBegin);
    const to=dateParseForFetch(dateEnd);

    fetch(`${fullUrl}&$limit=25000&datetime[$gte]=${from}&datetime[$lte]=${to}`)
        .then(r=>r.json())
        .then(result=>{
            if(result.data.length>0){
                const total=result.total;
                //console.log('total is',total)
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
                
                if(total>25000){
                    for(let i=1;i<(total/25000);i++){
                      //console.log(`${fullUrl}&$limit=25000&$skip=${i*25000}&datetime[$gte]=${from}&datetime[$lte]=${to}`)
                        fetchesArray.push(`${fullUrl}&$limit=25000&$skip=${i*25000}&datetime[$gte]=${from}&datetime[$lte]=${to}`)
                    }
                    let fetchRequests=fetchesArray.map(oneFetch=>fetch(oneFetch).then(result=>{return result.json()}))
                    Promise.all(fetchRequests)
                        .then(response=>{
                            //console.log('response of promisses',response)
                            response.forEach(oneResponse=>{
                               // console.log('pushing to chart data of one fetch',oneResponse)
                                oneResponse.data.forEach(oneData=>{
                                  //console.log('eachpush')
                                    temporData.push({ 
                                        x: (oneData.timestamp) * 1000, 
                                        open: oneData.open, 
                                        high: oneData.high, 
                                        low: oneData.low, 
                                        close: oneData.close 
                                    })
                                    
                                })

                                
                            })
                            const resultData=[]
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
                            //.log('tempor data length',newLength.value=temporData.length)
                            if(temporData.length>2000){
                              const divider=Math.round(temporData.length/1000)
                              for(let i=0;i<temporData.length;i++){
                                if(((i+1)%divider)===0){
                                  resultData.push(temporData[i])
                                }
                          
                              }
                              //console.log('done for instate',resultData)
                              setInstate(resultData);
                            }
                            else{
                              setInstate(temporData);
                            }
                            
                            setLengthArray(newLength);
                        })
                }
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
                            const resultData=[]
                            if(temporData.length>2000){
                              const divider=Math.round(temporData.length/1000)
                              for(let i=0;i<temporData.length;i++){
                                if(((i+1)%divider)===0){
                                  resultData.push(temporData[i])
                                }
                          
                              }
                              //console.log('done for instate',resultData)
                              temporData=resultData;
                            }
                            

                            setInstate(temporData);
                            setLengthArray(newLength);
                          
                
            }
            else{
                setWarning(true)
            }
        })
  }

 


  const LoadOption = (inputText) => {
    const neededTicker=inputText.toUpperCase()
    const url = 'http://62.216.47.4:21005/api/sec_data_tickers';
    return fetch(`${url}?ticker=` + neededTicker).then(r => r.json()).then(result => {
      return (result.data.map(oneResult => { 
        return ({ value: oneResult.ticker, label: oneResult.ticker }) }))
    })



  }
  useEffect(()=>{
    //console.log('data changed')
    setTextInfo('Load data success')
    setOneOfWarn('success')
    setStateInfoWarn(true)
    //console.log('instate is',instate.length)
  },[instate]);

  useEffect(()=>{
    //console.log('ticker changed')
    setTextInfo('Loading data')
    setOneOfWarn('info')
    setStateInfoWarn(true)
    changeChart()
  },[ticker]);

  useEffect(()=>{
    //console.log('begintime changed')
    setTextInfo('Loading data')
    setOneOfWarn('info')
    setStateInfoWarn(true)
    changeChart()
  },[dateBegin]);

  useEffect(()=>{
    //console.log('endtime changed',dateEnd)
    setTextInfo('Loading data')
    setOneOfWarn('info')
    setStateInfoWarn(true)
    changeChart()
  },[dateEnd]);



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
      <Collapse in={stateInfoWarn}>
      <Alert
          severity={oneOfWarn}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setStateInfoWarn(false);
              }}
            >close
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
         {textInfo}
        </Alert>
        </Collapse>
      <Stack direction='row'>

        <div>
          <AsyncSelect
            
            defaultOptions
            loadOptions={LoadOption}
            cacheOptions
            onChange={(e) => {
              
              //console.log('change ticker',e.value.toUpperCase)
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
                  //console.log('change dateBegin',date) 

                  
                  }} />
            </div>
            <div style={{ paddingLeft: '20px' }}>
              <h5>set end of taken datas</h5>
              <ReactDatePicker 
              selected={dateEnd} 
              onChange={(date) => { 
                setDateEnd(date) 
                //console.log('change dateBegin',date) 
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