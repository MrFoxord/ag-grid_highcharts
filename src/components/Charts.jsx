import React from 'react';
import AsyncSelect from 'react-select/async';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import { useState, useEffect } from 'react';
import { Stack, TextField, Button,Alert,IconButton,Collapse } from '@mui/material';

export default function Charts() {
  const chartUrl='http://62.216.47.4:21005/api/data?type=price&symbol='
  const data1 = [];
  const data2 = [];
  const data3 = [];
  const data4 = [];
  const [changedData,setChangedData]=useState([])
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
      value: 'CLSK',
      label: 'CLSK'
    },
    {
      value: 'NVAX',
      label: 'NVAX'
    },
    {
      value: 'EQ',
      label: 'EQ'
    },
    {
      value: 'CRSP',
      label: 'CRSP'
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
        data: instate.dData,
        type: 'candlestick',

      }

    ],

    xAxis: {
      tickPixelInterval: 10,
      visible: false
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
  useEffect(() => {
    setInstate({ loading: true });
    fetch(chartUrl+`CLSK`)
      .then(result => result.json())
      .then(jsonData => {
        //console.log('done',jsonData)
        const dataLength=lengthArray
        console.log('LENGTH',jsonData.data.length);
        dataLength.value1=jsonData.data.length;
        jsonData.data.forEach(item => {
          const Ddate = new Date(item.date);

          data1.push({ x: Ddate, open: item.open, high: item.high, low: item.low, close: item.close });
        });
        //console.log('done 2',data1)
        setInstate({ loading: false, dData: data1 })
      })

    fetch(chartUrl+'NVAX')
      .then(result => result.json())
      .then(jsonData => {
        const dataLength=lengthArray
        console.log('LENGTH',jsonData.data.length);
        dataLength.value1=jsonData.data.length;

        //console.log('done',jsonData)
        jsonData.data.forEach(item => {
          const Ddate = new Date(item.date);

          data2.push({ x: Ddate, open: item.open, high: item.high, low: item.low, close: item.close });
        });
        //console.log('done 2',data1)
        setInstate2({ loading: false, dData: data2 })
      })

    fetch(chartUrl+`EQ`)
      .then(result => result.json())
      .then(jsonData => {
        const dataLength=lengthArray
        console.log('LENGTH',jsonData.data.length);
        dataLength.value1=jsonData.data.length;
        //console.log('done',jsonData)
        jsonData.data.forEach(item => {
          const Ddate = new Date(item.date);

          data3.push({ x: Ddate, open: item.open, high: item.high, low: item.low, close: item.close });
        });
        //console.log('done 2',data1)
        setInstate3({ loading: false, dData: data3 })
      })

    fetch(chartUrl+`CRSP`)
      .then(result => result.json())
      .then(jsonData => {
        const dataLength=lengthArray
        console.log('LENGTH',jsonData.data.length);
        dataLength.value1=jsonData.data.length;
        //console.log('done',jsonData)
        jsonData.data.forEach(item => {
          const Ddate = new Date(item.date);

          data4.push({ x: Ddate, open: item.open, high: item.high, low: item.low, close: item.close });
        });
        //console.log('done 2',data1)
        setInstate4({ loading: false, dData: data4 })
      })

  }, []);

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
        result.data.forEach(oneData=>{
          ourData.push({x:new Date(oneData.date), open: oneData.open, high: oneData.high, low: oneData.low, close: oneData.close})
        })
        console.log('instate',instate);
        setChangedData(result.data);  

        console.log('context',dialContext)
      switch (dialContext) {
        case 1:
          if(lengthArray.value1===result.data.length){
            ourData.unshift({x:new Date (result.data[0].date-1000), open:0, close:0, high:0, low:0})
            console.log('proc equal length', ourData)
          }
          const firstState=instate;
          const newLength1=lengthArray;
          newLength1.value1=ourData.length;
          firstState.dData=ourData;
          setLengthArray(newLength1);
          setInstate(firstState);
          
          break
  
        case 2:
          if(lengthArray.value2===result.data.length){
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
          if(lengthArray.value3===result.data.length){
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
          if(lengthArray.value4===result.data.length){
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