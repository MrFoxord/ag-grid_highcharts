import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import { useState,useEffect, useMemo } from 'react';




function App() {
  const urlHighcharts='http://62.216.33.167:21005/api/data?type=price&symbol=CLSK';  
  const urlAgGrid='http://62.216.33.167:21005/api/filings';
  const data1=[];
  
const [limit,setLimit]=useState(100);

  const [instate,setInstate]=useState({
    loading:false,
    closeData:null,
  })



  useEffect(()=>{
    setInstate({loading:true});
    fetch(`${urlHighcharts}&$limit=${limit}`)
    .then(result=>result.json())
    .then(jsonData=>{
      jsonData.data.forEach(item=>{
        const Ddate=new Date(item.date);
        console.log(Ddate);
        data1.push([Ddate,item.open,item.high,item.low,item.close]);
      });
      setInstate({loading:false,dData:data1})
    })
  },[limit]);
  let ddata=instate.dData;
  //console.log(close);
  const options1={
    credits: {
      text: 'My Credits',
      
    },
   
    title: {
      text: 'Highcharts (open,close,high,low)'
    },
    rangeSelector: {
      enabled: true,
      allButtonsEnabled:true,
      
      buttonTheme: {
        width: 50
    },
      buttons: [{
          type: 'millisecond',
          count: 10,
          text: '10 mins'
      },
      {
        type:'millisecond',
        count:60,
        text:'1 hour'
      },
      {
        type: 'all',
        count: 1,
        text: 'All'
      }],
      selected: 2,
      inputEnabled: false
  },
  scrollbar:{
    enabled:true,
    
  },
  navigator:{
    enabled:true
  },
    series: [
      {
        name:'Data',
        data:ddata,
        type:'candlestick',
        
      }
      
    ],
    
    xAxis: {
        tickPixelInterval: 25
    },
   
  };

  
//console.log(options);
  
const [rowData,setRowData]=  useState([
    {_id:'',
      id:'',
      href:'',
      updated:'',
      title:'',
      formType:'',
      cik:"",
      accessionNumber:"",
      filingStructure:[],
    },
  ]);
  
const [columnDefs,setColumnDefs]= useState ([
    {field:'_id', width:250},
    {field:'id', width:500},
    {field:'href', width:750},
    {field:'updated', width:200},
    {field:'title', width:500},
    {field:'formType', width:150},
    {field:'cik', width:150},
    {field:'accessionNumber', width:200},
    {field:'filingStructure', width:2000},
  ]);

  const defaultColDef=useMemo(()=>({
    sortable:true,
    filter:true,
    resizable:true,
    
  }),[]);
  let dataArray=[];

  // fetch for AG GRID datas
  useEffect(()=>{
    fetch(`${urlAgGrid}?$limit=1000`)
    .then(result=>result.json())
    .then(rawData=>{
      rawData.data.forEach(element=>{
        dataArray.push(element);
      })
    })
    .then(()=>{
      dataArray.map(element=>{
        if(element.filingStructure){
          element.filingStructure=JSON.stringify(element.filingStructure)
          return element;
        }
        return element;
      })
      setRowData(dataArray)});

  //fetch for Highcharts data
     // console.log(close);
  
 // console.log(options);
  
  },[]);
  return (
    <div>
      <div>
        <button onClick={(e)=>{
          e.preventDefault();
          setLimit(limit+20);
        }}>add +20 positions</button>
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options1} />
      </div>
      <div className='ag-theme-alpine' style={{height:'90vh'}}>
        <h2 style={{textAlign:'center'}}>Test of Ag-grid table system</h2>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection='multiple'
          animateRows={true}
          autoSizeAllColumns={true}
        />
      </div>
    
    </div>
  );
}

export default App;
