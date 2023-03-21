import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Highcharts, { keys } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import { useState,useEffect, useMemo } from 'react';
import { Stack,TextField,Button,Chip } from '@mui/material';


function App() {
  const [urlAgGrid,setUrlAgGrid]=useState('http://62.216.33.167:21005/api/filings');
  const [urlHighcharts,setUrlHighcharts]=useState('http://62.216.33.167:21005/api/data?type=price&symbol=CLSK') ;  
  const data1=[];
  
const [limit,setLimit]=useState(100);
const [agLimit,setAgLimit]=useState(1000);
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
        
        data1.push([Ddate,item.open,item.high,item.low,item.close]);
      });
      setInstate({loading:false,dData:data1})
    })
  },[limit]);
  let ddata=instate.dData;
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
const [agGridData,setAgGridData]=useState ({
  total:0,
  data:[],
  url:''
})  
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
  const [llabel,setLabel]=useState('')

  const changeUrl=()=>{
    setUrlAgGrid(llabel);
  }

  const defaultColDef=useMemo(()=>({
    sortable:true,
    filter:true,
    resizable:true,
    
  }),[]);
  let dataArray=[];

  // fetch for AG GRID datas
  useEffect(()=>{
    if(agGridData.url!==urlAgGrid){
      
      const newState=agGridData;
      newState.url=urlAgGrid
      setRowData(null)
      setAgGridData(newState)

      fetch(`${agGridData.url}`)
      .then(r=>r.json())
      .then(async result=>{
        const types=Object.entries(result.data[0]);
        const newTypes=[]
        types.forEach(oneType=>{
          newTypes.push({field:oneType[0],width:250})
        })
        setColumnDefs(newTypes);


        
        newState.total=result.total
        setAgGridData(newState)
        for(let i=0; i<(agGridData.total/1000);i++){
          if(i==0){
            //console.log('first step')
            const firstData= await fetch(`${agGridData.url}?$limit=1000`).then(r=>r.json())
            const data1=agGridData;
            data1.data=firstData.data;
            const parsedData=[]
              data1.data.forEach(dataOne=>{
                const arrData=Object.entries(dataOne)
                arrData.forEach(oneArr=>{if(typeof oneArr[1]==='object'){oneArr[1]=JSON.stringify(oneArr[1])}})
                parsedData.push(Object.fromEntries(arrData))
              })
              data1.data=parsedData

            setAgGridData(data1.data);
            setRowData(agGridData.data);
            break
          }else{
            //first if (in comment to fast demonstrate, if what uncommented for full workin with all feathets datas )
            //if(i<5){
            if((agGridData.total-i*1000)>1000){

              // const insideData=await fetch(`${agGridData.url}?$limit=1000&$skip=${i*1000}`).then(r=>r.json());
              // const data2=agGridData;
              // insideData.data.forEach(dataOne=>{data2.data.push(dataOne)})
              // setAgGridData(data2);
              //console.log('step inside')
              continue
            }else{
              // const lastData=await fetch(`${agGridData.url}?$limit=${agGridData.total-(i)*1000}&$skip=${(i)*1000}`).then(r=>r.json())
              // const data3=agGridData;
              // lastData.data.forEach(dataOne=>{data3.data.push(dataOne)})
              // const parsedData=[]
              // data3.data.forEach(dataOne=>{
              //   const arrData=Object.entries(dataOne)
              //   arrData.forEach(oneArr=>{if(typeof oneArr[1]==='object'){oneArr[1]=JSON.stringify(oneArr[1])}})
              //   parsedData.push(Object.fromEntries(arrData))
              // })
              // data3.data=parsedData

              // setAgGridData(data3);
              // setRowData(agGridData.data);
              //  //console.log('last step')
              
              break
            }
          }

          
        }
      })

      
    }

  },[urlAgGrid]);
  
  
  return (
    <div>
      <Stack spacing={0.5} direction='row' style={{marginTop:'10px',marginLeft:'10px',height:'80px' }}>
        <TextField 
        value={llabel} 
        label='Url of asked source' 
        variant='outlined'
        style={{
          height:'40px',
          fontSize:'10px',
          padding:'0px',
          minWidth:'400px',
          maxWidth:'600px'

        }} 
        onChange={(e)=>{
          setLabel(e.target.value)
        }}/>


        <Button  
          className='urlButton' 
          variant='contained' 
          onClick={changeUrl} 
          style={{
            maxWidth: '500px',
            minWidth: '10px',
            height: '55px', 
            fontSize:'10px',
            padding:'10px'}}
        >
          Change
        </Button> 

      </Stack>
      <div>
        <Stack 
          spacing={2}
          direction='row'
          style={{
            marginTop:'0px',
            marginLeft:'10px',
            height:'80px'
            }}
          >
          <Button  
            variant='outlined' 
            onClick={(e)=>{
              e.preventDefault();
              setLimit(limit+20);
              }} 
            style={{
              maxWidth: '500px', 
              maxHeight: '50px', 
              minWidth: '10px', 
              minHeight: '30px',
              fontSize:'12px'}}>
          +20 points to HighChart
          </Button>
        </Stack>
        
        
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options1} />
      </div>
      <div className='ag-theme-alpine' style={{height:'90vh'}}>
        <h2 style={{textAlign:'center'}}>Test of Ag-grid table system</h2>
        <AgGridReact
          overlayNoRowsTemplate='Please wait, until all data loading'
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
