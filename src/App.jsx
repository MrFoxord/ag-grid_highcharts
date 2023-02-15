import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import { useState,useEffect, useMemo } from 'react';



function App() {
  const urlHighcharts='http://62.216.33.167:21005/api/data?type=price&symbol=CLSK';  
  const urlAgGrid='http://62.216.33.167:21005/api/filings';

  const open=[];
  const close=[];
  const high=[];
  const low=[];
  const volume=[];

  
  const [instate,setInstate]=useState({
    loading:false,
    closeData:null,
  })

  useEffect(()=>{
    setInstate({loading:true});
    fetch(`${urlHighcharts}&$limit=100`)
    .then(result=>result.json())
    .then(jsonData=>{
      jsonData.data.forEach(item=>{
        close.push([item.symbol+' '+item.date+toString(),item.close]);
        open.push([item.symbol+' '+item.date.toString(),item.open]);
        high.push([item.symbol+' '+item.date.toString(),item.high]);
        low.push([item.symbol+' '+item.date.toString(),item.low]);
        volume.push([item.symbol+' '+item.date.toString(),item.volume]);
      });
      setInstate({loading:false,closeData:close,openData:open,highData:high,lowData:low,volumeData:volume})
    })
  },[setInstate]);
  let closeData=instate.closeData;
  let openData=instate.openData;
  let highData=instate.highData;
  let lowData=instate.lowData;
  let volumeData=instate.volumeData
  //console.log(close);
  const options1={
    credits: {
      text: 'My Credits',
      href: 'https://jenniferfubook.medium.com/jennifer-fus-web-development-publications-1a887e4454af',
    },
    chart: {
      type: 'line'
    },
    title: {
      text: 'Highcharts (open,close,high,low)'
    },
    series: [
      { 
        name:'Close',
        data: closeData
        
      },
      { 
        name:'Open',
        data: openData
        
      },
      { 
        name:'High',
        data: highData
        
      },
      { 
        name:'Low',
        data: lowData
        
      },
      
    ]
  };

  const options2={
    credits: {
      text: 'My Credits',
      href: 'https://jenniferfubook.medium.com/jennifer-fus-web-development-publications-1a887e4454af',
    },
    chart: {
      type: 'line'
    },
    title: {
      text: 'Highchart (volume)'
    },
    series: [
      { 
        name:'Volume',
        data: volumeData
      }
      
    ]
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
    <div>
    <HighchartsReact highcharts={Highcharts} options={options1}  />
    <HighchartsReact highcharts={Highcharts} options={options2}  />
    </div>
    </div>
  );
}

export default App;
