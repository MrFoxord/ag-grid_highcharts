import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState, useEffect, useMemo,useRef,useCallback } from 'react';
import { Stack, TextField, Button } from '@mui/material';

export default function Ag(){


  const [urlAgGrid, setUrlAgGrid] = useState('http://62.216.47.4:21005/api/filings');

  const [help,setHelp]=useState(false)
  const [rowData, setRowData] = useState([
    {
      _id: '',
      id: '',
      href: '',
      updated: '',
      title: '',
      formType: '',
      cik: "",
      accessionNumber: "",
      filingStructure: [],
    },
  ]);
  const [agGridData, setAgGridData] = useState({
    data: [],
    url: ''
  })
  const [columnDefs, setColumnDefs] = useState([
  ]);
  const [agLabel, setAgLabel] = useState('')

  const changeUrlAgGrid = () => {
    setUrlAgGrid(agLabel);
  }

  
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    enableRowGroup:true,
    flex:1,
    enableValue: true,
    enablePivot: true,
  }), []);

  const  [colArray,setColArray] = useState([])
  // fetch for AG GRID datas
  useEffect(() => {
    if (agGridData.url !== urlAgGrid) {

      const newState = agGridData;
      newState.url = urlAgGrid
      setRowData(null)
      setAgGridData(newState)

      fetch(`${agGridData.url}`)
        .then(r => r.json())
        .then(result => {
          const createColArray=[]
          const types = Object.entries(result.data[0]);
          const newTypes = []
          types.forEach(oneType => {
            createColArray.push(oneType[0]);
            newTypes.push({ field: oneType[0] })
          })
          setColumnDefs(newTypes);
          setColArray(createColArray);



          newState.total = result.total;
          const parsedData = []
          result.data.forEach(dataOne => {
            const arrData = Object.entries(dataOne)
            arrData.forEach(oneArr => { if (typeof oneArr[1] === 'object') { oneArr[1] = JSON.stringify(oneArr[1]) } })
            parsedData.push(Object.fromEntries(arrData))
          })
          newState.data = parsedData


          setAgGridData(newState);
          setRowData(agGridData.data);

        })
    }

  }, [urlAgGrid]);
  
  const gridRef=useRef();
  const autoSizeAll=useCallback(()=>{
    console.log('call of callback',gridRef)
    
    gridRef.current.columnApi.autoSizeAllColumns(colArray)
  },[])
  
  const sideBar={
    toolPanels:[
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        minWidth: 225,
        width: 225,
        maxWidth: 225,
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
        minWidth: 180,
        maxWidth: 400,
        width: 250,
      },
    ]
  }
  
  if(help===true){
    autoSizeAll();
  }

  return (
    <div>
      <button onClick={()=>{autoSizeAll()}}>press me</button>
    <Stack spacing={0.5} direction='row' style={{ marginTop: '50px', marginLeft: '10px', height: '80px' }}>
        <TextField
          value={agLabel}
          label='Enter url for new datas for table here'
          variant='outlined'
          style={{
            height: '40px',
            fontSize: '10px',
            padding: '0px',
            minWidth: '400px',
            maxWidth: '600px'

          }}
          onChange={(e) => {
            setAgLabel(e.target.value)
          }} />


        <Button
          className='urlButton'
          variant='contained'
          onClick={changeUrlAgGrid}
          style={{
            maxWidth: '500px',
            minWidth: '10px',
            height: '55px',
            fontSize: '10px',
            padding: '10px'
          }}
        >
          Change
        </Button>

      </Stack>
      <div className='ag-theme-alpine' style={{ height: '90vh' }}>
        <h2 style={{ textAlign: 'center' }}>Test of Ag-grid table system</h2>
        <AgGridReact
          ref={gridRef}
          sideBar={sideBar}
          rowGroupPanelShow='always'
          overlayNoRowsTemplate='no data to show'
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection='multiple'
          animateRows={true} 
          onGridReady={()=>{ setHelp(true) } }          
        />
     
      </div>
      </div>
  )
}