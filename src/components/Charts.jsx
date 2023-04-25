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
    dData:[],
    
  });

  const [instate2, setInstate2] = useState({
    loading: false,
  });

  const [instate3, setInstate3] = useState({
    loading: false,
  });

  const [instate4, setInstate4] = useState({
    loading: false,
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
        cropThreshold: 1000000

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
        cropThreshold: 1000000

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
        cropThreshold: 1000000

      }

    ],

    xAxis: {
      tickPixelInterval: 10,
      visible: false
    },

  };

  function FirstRender(ticker){
    const fullUrl=chartUrl+ticker
    const newData=[];


    fetch(fullUrl)
    .then(result=>result.json())
    .then(jsonResult=>{
      jsonResult.data.forEach(oneResult=>{
        newData.push({x: new Date((oneResult.timestamp)*1000), open: oneResult.open, high: oneResult.high, low: oneResult.low, close: oneResult.close})
      })
      return newData
      
      
    })

    
  }

  // Re-render of highchart
  useEffect(() => {
    fetch(chartUrl+ticker1.value)
      .then(result => result.json())
      .then(jsonData => {
        const newData=[]
        const dataLength=lengthArray
        dataLength.value1=jsonData.data.length;
        jsonData.data.forEach(item => {
          const Ddate = new Date(((item.timestamp)*1000));

          newData.push({ x: Ddate, open: item.open, high: item.high, low: item.low, close: item.close });
        });
        setInstate({ loading: false, dData: newData })
        setLengthArray(dataLength)
      })

    fetch(chartUrl+ticker2.value)
      .then(result => result.json())
      .then(jsonData => {
        const newData=[]
        const dataLength=lengthArray
        dataLength.value1=jsonData.data.length;
        jsonData.data.forEach(item => {
          const Ddate = new Date(((item.timestamp)*1000));

          newData.push({ x: Ddate, open: item.open, high: item.high, low: item.low, close: item.close });
        });
        setInstate2({ loading: false, dData: newData })
        setLengthArray(dataLength)
      })

    fetch(chartUrl+ticker3.value)
      .then(result => result.json())
      .then(jsonData => {
        const newData=[]
        const dataLength=lengthArray
        dataLength.value1=jsonData.data.length;
        jsonData.data.forEach(item => {
          const Ddate = new Date(((item.timestamp)*1000));

          newData.push({ x: Ddate, open: item.open, high: item.high, low: item.low, close: item.close });
        });
        setInstate3({ loading: false, dData: newData })
        setLengthArray(dataLength)
      })

    fetch(chartUrl+ticker4.value)
      .then(result => result.json())
      .then(jsonData => {
        const newData=[]
        const dataLength=lengthArray
        dataLength.value1=jsonData.data.length;
        jsonData.data.forEach(item => {
          const Ddate = new Date(((item.timestamp)*1000));

          newData.push({ x: Ddate, open: item.open, high: item.high, low: item.low, close: item.close });
        });
        setInstate4({ loading: false, dData: newData })
        setLengthArray(dataLength)
      })

  }, []);

  const changeTicker = (event) => {
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

        setChangedData(ourData);  

      switch (dialContext) {
        case 1:
          if(lengthArray.value1===total){
            ourData.unshift({x:new Date (result.data[0].date-1000), open:0, close:0, high:0, low:0})
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