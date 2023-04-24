import React from 'react';
import AsyncSelect from 'react-select/async';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import { useState, useEffect } from 'react';
import { Stack, TextField, Button,Alert,IconButton,Collapse } from '@mui/material';

export default function Charts() {
  const chartUrl='http://62.216.47.4:21005/api/tickers_intraday_data?ticker='
  const chandeChartUrl='http://62.216.47.4:21005/api/tickers_intraday_data'
  const data1 = [];
  const data2 = [];
  const data3 = [];
  const data4 = [];
  const [changedData,setChangedData]=useState([])
  const [onluOneRender,setOnlyOneRender]=useState(true)
  const [lengthArray,setLengthArray]=useState({
    value1:0,
    value2:0,
    value3:0,
    value4:0
  })
  const [instate, setInstate] = useState({
    loading: false,
    closeData: null,
  });

  const [instate2, setInstate2] = useState({
    loading: false,
    closeData: null,
  });

  const [instate3, setInstate3] = useState({
    loading: false,
    closeData: null,
  });

  const [instate4, setInstate4] = useState({
    loading: false,
    closeData: null,
  });

  
  const [tickersArray, setTickersArray] = useState([
    {
      value: 'AAPL',
      label: 'AAPL'
    },
    {
      value: 'MSFT',
      label: 'MSFT'
    },
    {
      value: 'GOOGL',
      label: 'GOOGL'
    },
    {
      value: 'AMZN',
      label: 'AMZN'
    }])



  const [dialContext, setDialContext] = useState(4);
  const [warning,setWarning]=useState(false)

  const [ticker1, setTicker1] = useState(tickersArray[0])
  const [ticker2, setTicker2] = useState(tickersArray[1])
  const [ticker3, setTicker3] = useState(tickersArray[2])
  const [ticker4, setTicker4] = useState(tickersArray[3])

  const options1 = {
    credits: {
      text: 'My Credits',

    },
    chart: {
      width: 600
    },

    title: {
      text: 'Highcharts (open,close,high,low)'
    },
    rangeSelector: {
      enabled: true,
      allButtonsEnabled: true,

      buttonTheme: {
        width: 200
      },
      buttons: [{
        type: 'millisecond',
        count: 3600000,
        text: '10 points'
      },
      {
        type: 'millisecond',
        count: 86400000,
        text: '50 points'
      },
      {
        type: 'millisecond',
        count: 31536000000,
        text: '100 points'
      },
      {
        type: 'all',
        count: 1,
        text: 'All'
      }],
      selected: 10,
      inputEnabled: true
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
        type: 'candlestick',
      cropThreshold: 1000000
      },
      

    ],

    xAxis: {
      tickPixelInterval: 10000,
      visible: false,
      ordinal:false,
      type:'datetime'
      
    },

    
  };
  const options2 = {
    chart: {
      width: 600
    },
    credits: {
      text: 'My Credits',

    },

    title: {
      text: 'Highcharts (open,close,high,low)'
    },
    rangeSelector: {
      enabled: true,
      allButtonsEnabled: true,

      buttonTheme: {
        width: 50
      },
      buttons: [{
        type: 'millisecond',
        count: 10,
        text: '10 mins'
      },
      {
        type: 'millisecond',
        count: 60,
        text: '1 hour'
      },
      {
        type: 'all',
        count: 1,
        text: 'All'
      }],
      selected: 2,
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
        data: instate2.dData,
        type: 'candlestick',

      }

    ],

    xAxis: {
      tickPixelInterval: 10,
      visible: false
    },

  };
  const options3 = {
    credits: {
      text: 'My Credits',

    },
    chart: {
      width: 600
    },

    title: {
      text: 'Highcharts (open,close,high,low)'
    },
    rangeSelector: {
      enabled: true,
      allButtonsEnabled: true,

      buttonTheme: {
        width: 50
      },
      buttons: [{
        type: 'millisecond',
        count: 10,
        text: '10 mins'
      },
      {
        type: 'millisecond',
        count: 60,
        text: '1 hour'
      },
      {
        type: 'all',
        count: 1,
        text: 'All'
      }],
      selected: 2,
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
        data: instate3.dData,
        type: 'candlestick',

      }

    ],

    xAxis: {
      tickPixelInterval: 10,
      visible: false
    },

  };
  const options4 = {
    credits: {
      text: 'My Credits',

    },
    chart: {
      width: 600
    },

    title: {
      text: 'Highcharts (open,close,high,low)'
    },
    rangeSelector: {
      enabled: true,
      allButtonsEnabled: true,

      buttonTheme: {
        width: 50
      },
      buttons: [{
        type: 'millisecond',
        count: 10,
        text: '10 mins'
      },
      {
        type: 'millisecond',
        count: 60,
        text: '1 hour'
      },
      {
        type: 'all',
        count: 1,
        text: 'All'
      }],
      selected: 2,
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
        data: instate4.dData,
        type: 'candlestick',

      }

    ],

    xAxis: {
      tickPixelInterval: 10,
      visible: false
    },

  };

  // Re-render of highchart
  useEffect(() => {if(setOnlyOneRender){
    setOnlyOneRender(false)
    console.log('first render',chartUrl+`AAPL`);
    fetch(chartUrl+`AAPL`)
      .then(result => result.json())
      .then(jsonData => {
        
        const total=jsonData.total;
        console.log('total',total)
        const dataLength=lengthArray
        dataLength.value1=total
        setLengthArray(dataLength)
        const newData1=[]
        const newSecData=[]
        for(let i=0;i<1;i++){
          if(i===0){
            console.log('first fetch')
            console.log(`${chartUrl}AAPL&$limit=1000`)
            fetch(`${chartUrl}AAPL&$limit=1000`)
              .then(result=>result.json())
              .then(jsonResult=>{
                console.log('fetched',jsonResult.data)
                jsonResult.data.forEach(oneResult=>{
                  const Ddate = new Date((oneResult.timestamp)*1000);
                  //console.log('date',Ddate)
                  newData1.push({ x: (oneResult.timestamp)*1000, open: oneResult.open, high: oneResult.high, low: oneResult.low, close: oneResult.close });
                  newSecData.push({x:(oneResult.timestamp)*1000, value:oneResult.value})
                })
                setInstate({ loading: false, dData: newData1 ,aData:newSecData});
                // console.log('SEND FIRST DATA',data1)
              })
          }
          if((i>0)&&(((total-(i*1000))<1000))){
            console.log('step number',i+1)
            fetch(`${chartUrl}AAPL&$skip=${i*1000}&$limit=1000`)
              .then(result=>result.json())
              .then(jsonResult=>{
                jsonResult.data.forEach(oneResult=>{
                const Ddate = new Date((oneResult.timestamp)*1000);
                
                newData1.push({ x: Ddate, open: oneResult.open, high: oneResult.high, low: oneResult.low, close: oneResult.close });
                
                })
                console.log('SEND SOME DATA')
                setInstate({ loading: false, dData: newData1 })
              })
          }
          if((total-(i*1000))<1000){
            fetch(`${chartUrl}AAPL&$skip=${i*1000}&$limit=1000`)
              .then(result=>result.json())
              .then(jsonResult=>{
                jsonResult.data.forEach(oneResult=>{
                const Ddate = new Date((oneResult.timestamp)*1000);
                
                newData1.push({ x: Ddate, open: oneResult.open, high: oneResult.high, low: oneResult.low, close: oneResult.close });
                })
                console.log('SEND FINAL DATA')
            //     console.log('last circle')
            // console.log('length',data1.length)
            // console.log('data',data1)
             setInstate({ loading: false, dData: newData1 })
              })
            
          }
          
        }
        
      })

    fetch(chartUrl+'MSFT')
      .then(result => result.json())
      .then(jsonData => {
        const total=jsonData.total;
        const dataLength=lengthArray
        dataLength.value2=total
        setLengthArray(dataLength)

        for(let i=0;i<(total/1000);i++){
          if(i===0){
            fetch(`${chartUrl}MSFT&$limit=1000`)
              .then(result=>result.json())
              .then(jsonResult=>{
                jsonResult.data.forEach(oneResult=>{
                  const Ddate = new Date((oneResult.timestamp)*1000);
                  data2.push({ x: Ddate, open: oneResult.open, high: oneResult.high, low: oneResult.low, close: oneResult.close });
                })
              })
          }
          if(i>0){
            fetch(`${chartUrl}MSFT&$skip=${i*1000}&$limit=1000`)
              .then(result=>result.json())
              .then(jsonResult=>{
                jsonResult.data.forEach(oneResult=>{
                const Ddate = new Date((oneResult.timestamp)*1000);
                data2.push({ x: Ddate, open: oneResult.open, high: oneResult.high, low: oneResult.low, close: oneResult.close });
                })
              })
          }
        }
        setInstate2({ loading: false, dData: data2 })
      })

    fetch(chartUrl+`GOOGL`)
      .then(result => result.json())
      .then(jsonData => {
        const total=jsonData.total;
        const dataLength=lengthArray
        dataLength.value3=total
        setLengthArray(dataLength)

        for(let i=0;i<(total/1000);i++){
          if(i===0){
            fetch(`${chartUrl}GOOGL&$limit=1000`)
              .then(result=>result.json())
              .then(jsonResult=>{
                jsonResult.data.forEach(oneResult=>{
                  const Ddate = new Date((oneResult.timestamp)*1000);
                  data3.push({ x: Ddate, open: oneResult.open, high: oneResult.high, low: oneResult.low, close: oneResult.close });
                })
              })
          }
          if(i>0){
            fetch(`${chartUrl}GOOGL&$skip=${i*1000}&$limit=1000`)
              .then(result=>result.json())
              .then(jsonResult=>{
                jsonResult.data.forEach(oneResult=>{
                const Ddate = new Date((oneResult.timestamp)*1000);
                data3.push({ x: Ddate, open: oneResult.open, high: oneResult.high, low: oneResult.low, close: oneResult.close });
                })
              })
          }
        }
        setInstate3({ loading: false, dData: data3 })
      })

    fetch(chartUrl+`AMZN`)
      .then(result => result.json())
      .then(jsonData => {
        const total=jsonData.total;
        const dataLength=lengthArray
        dataLength.value4=total
        setLengthArray(dataLength)

        for(let i=0;i<(total/1000);i++){
          if(i===0){
            fetch(`${chartUrl}AMZN&$limit=1000`)
              .then(result=>result.json())
              .then(jsonResult=>{
                jsonResult.data.forEach(oneResult=>{
                  const Ddate = new Date((oneResult.timestamp)*1000);
                  data4.push({ x: Ddate, open: oneResult.open, high: oneResult.high, low: oneResult.low, close: oneResult.close });
                })
              })
          }
          if(i>0){
            fetch(`${chartUrl}AMZN&$skip=${i*1000}&$limit=1000`)
              .then(result=>result.json())
              .then(jsonResult=>{
                jsonResult.data.forEach(oneResult=>{
                const Ddate = new Date((oneResult.timestamp)*1000);
                data4.push({ x: Ddate, open: oneResult.open, high: oneResult.high, low: oneResult.low, close: oneResult.close });
                })
              })
          }
        }
        //console.log('done 2',data1)
        setInstate4({ loading: false, dData: data4 })
      })

  }}, []);

  const changeTicker = (event) => {
     console.log('change to', event)
     console.log('context', dialContext)
    switch (dialContext) {
      case 1:
        setTicker1(event)
        break

      case 2:
        setTicker2(event)
        break

      case 3:
        setTicker3(event)
        break

      case 4:
        setTicker4(event)
        break

      default:
        break

    }

  }
  const changeChartData=(event)=>{
    const askedUrl=chartUrl+event.value
    
    fetch(askedUrl)
      .then(r=>r.json())
      .then( result=>{

        if(result.data.length>0){
        const ourData=[]
        const total=result.total
        
        for(let i=0;i<(total/1000);i++){
          if(i===0){
            fetch(`${askedUrl}&$limit=1000`)
              .then(result=>result.json())
              .then(jsonResult=>{
                jsonResult.data.forEach(oneResult=>{
                  const Ddate = new Date((oneResult.timestamp)*1000);
                  ourData.push({ x: Ddate, open: oneResult.open, high: oneResult.high, low: oneResult.low, close: oneResult.close });
                })
              })
          }
          if(i>0){
            fetch(`${askedUrl}&$skip=${i*1000}&$limit=1000`)
              .then(result=>result.json())
              .then(jsonResult=>{
                jsonResult.data.forEach(oneResult=>{
                const Ddate = new Date((oneResult.timestamp)*1000);
                ourData.push({ x: Ddate, open: oneResult.open, high: oneResult.high, low: oneResult.low, close: oneResult.close });
                })
              })
          }
        }

        console.log('instate',instate);
        setChangedData(ourData);  

        console.log('context',dialContext)
      switch (dialContext) {
        case 1:
          if(lengthArray.value1===total){
            ourData.unshift({x:new Date (result.data[0].date-1000), open:0, close:0, high:0, low:0})
            console.log('proc equal length', ourData)
          }
          const firstState=instate;
          const newLength1=lengthArray;
          newLength1.value1=ourData.length;
          firstState.dData=ourData;
          setLengthArray(newLength1);
          //setInstate(firstState);
          
          break
  
        case 2:
          if(lengthArray.value2===result.total){
            ourData.unshift({x:new Date (result.data[0].date-1000), open:0, close:0, high:0, low:0})
            console.log('proc equal length', ourData)
          }
          const secondState=instate2;
          const newLength2=lengthArray;
          newLength2.value2=ourData.length;
          secondState.dData=ourData;
          setLengthArray(newLength2);
          setInstate2(secondState);
          break
  
        case 3:
          if(lengthArray.value3===result.total){
            ourData.unshift({x:new Date (result.data[0].date-1000), open:0, close:0, high:0, low:0})
            console.log('proc equal length', ourData)
          }
          const thirdState=instate3;
          const newLength3=lengthArray;
          newLength3.value3=ourData.length;
          thirdState.dData=ourData;
          setLengthArray(newLength3);
          setInstate3(thirdState);
          break
  
        case 4:
          if(lengthArray.value4===result.total){
            ourData.unshift({x:new Date (result.data[0].date-1000), open:0, close:0, high:0, low:0})
            console.log('proc equal length', ourData)
          }
          const fourthState=instate4;
          const newLength4=lengthArray;
          newLength4.value4=ourData.length;
          fourthState.dData=ourData;
          setLengthArray(newLength4);
          setInstate4(fourthState);
          break
  
        default:
          break
  
      }}
      else{setWarning(true)}
      
      })
  
  }

  useEffect(()=>{
    console.log('data realy changed')
  },[changedData])

  const LoadOption=(inputText)=>{
    console.log('LOAD OPTIOONS',typeof inputText)

    const url='http://62.216.47.4:21005/api/sec_data_tickers';
    return fetch(`${url}?ticker=`+inputText).then(r=>r.json()).then(result=>{
       return (result.data.map(oneResult=>{return ({value:oneResult.ticker, label:oneResult.ticker})}))})


   
  }
  useEffect(()=>{
    console.log('instate 1 ',instate)
  },[instate])
  return (
    <div>
      <h2>Charts</h2>
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
           value={ticker1}
           
            defaultOptions
            loadOptions={LoadOption}
            cacheOptions
            onFocus={()=>{setDialContext(1)}}
            onChange={(e) => {
              setDialContext(1)
              changeTicker(e)
              changeChartData(e)
            }
            }
          />

          <HighchartsReact
            highcharts={Highcharts}
            options={options1} />

        </div>

        <div>
        <AsyncSelect
           value={ticker2}
           
            defaultOptions
            loadOptions={LoadOption}
            onFocus={()=>{setDialContext(2)}}
            cacheOptions
            onChange={(e) => {
              setDialContext(2)
              changeTicker(e)
              changeChartData(e)
            }
            }
          />
          <HighchartsReact highcharts={Highcharts} options={options2} />
        </div>
      </Stack>
      <Stack direction='row'>
        <div>
        <AsyncSelect
           value={ticker3}
           
            defaultOptions
            loadOptions={LoadOption}
            cacheOptions
            onFocus={()=>{setDialContext(3)}}
            onChange={(e) => {
              setDialContext(3)
              changeTicker(e)
              changeChartData(e)
            }
            }
          />
          <HighchartsReact highcharts={Highcharts} options={options3} />
        </div>

        <div>
        <AsyncSelect
           value={ticker4}
           
            defaultOptions
            loadOptions={LoadOption}
            cacheOptions
            onFocus={()=>{setDialContext(4)}}
            onChange={(e) => {
              setDialContext(4)
              changeTicker(e)
              changeChartData(e)
            }
            }
          />
          <HighchartsReact highcharts={Highcharts} options={options4} />
        </div>
      </Stack>
      
    </div>
  )

}