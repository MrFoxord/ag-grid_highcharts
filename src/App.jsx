import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Highcharts, { keys } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import { useState, useEffect, useMemo,useRef,useCallback } from 'react';
import { Stack, TextField, Button, Chip,AppBar,Toolbar,IconButton,Typography,Drawer } from '@mui/material';
import {MenuIcon,ChevronLeft,ChevronRight} from '@mui/icons-material'


function App() {
  const [urlAgGrid, setUrlAgGrid] = useState('http://62.216.33.167:21005/api/filings');
  const [urlHighcharts, setUrlHighcharts] = useState('http://62.216.33.167:21005/api/data?type=price&symbol=CLSK');
  const data1 = [];
  const [instate, setInstate] = useState({
    loading: false,
    closeData: null,
  })

  let ddata = instate.dData;
  const options1 = {
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
        data: ddata,
        type: 'candlestick',

      }

    ],

    xAxis: {
      tickPixelInterval: 25,
      visible: false
    },

  };

  // Re-render of highchart
  useEffect(() => {
    setInstate({ loading: true });
    fetch(`${urlHighcharts}`)
      .then(result => result.json())
      .then(jsonData => {
        jsonData.data.forEach(item => {
          const Ddate = new Date(item.date);

          data1.push({ x: Ddate, open: item.open, high: item.high, low: item.low, close: item.close });
        });
        setInstate({ loading: false, dData: data1 })
      })
  }, [urlHighcharts]);


  const [colArray,setColArray]=useState([])

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
    { field: '_id'},
    { field: 'id'  },
    { field: 'href' },
    { field: 'updated' },
    { field: 'title' },
    { field: 'formType' },
    { field: 'cik' },
    { field: 'accessionNumber' },
    { field: 'filingStructure' },
  ]);
  const [agLabel, setAgLabel] = useState('')
  const [chartLabel, setChartLabel] = useState('')
  const [marker,setMarker]=useState(false);
  const changeUrlAgGrid = () => {
    setUrlAgGrid(agLabel);
  }

  const changeUrlChart = () => {
    setUrlHighcharts(chartLabel)
  }
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    enableRowGroup:true,
    flex:1,
    enableValue: true,
    enablePivot: true,
    autoSizeColumn:true,
    skipHeaderOnAutoSize:false,
    minWidth:20,
    maxWidth:500

  }), []);
  let dataArray = [];

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

          const types = Object.entries(result.data[0]);
          const newTypes = []
          types.forEach(oneType => {
            newTypes.push({ field: oneType[0], width: 250 })
          })
          setColumnDefs(newTypes);



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

  const gridRef=useRef()
  const autoSizeAll=useCallback(()=>{
    console.log('some',gridRef.current)
    console.log('some 2',colArray)
    const columns=[];
    gridRef.current.columnApi.getColumns().forEach((column)=>{
      columns.push(column.getId())
    });

    gridRef.current.columnApi.autoSizeColumns(columns);
  },[]);

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
  
  if(marker!==false){
    autoSizeAll();
  }

  const [open,setOpen]=useState(false)
  
  const handleDrawerOpen=()=>{
    setOpen(true);
  }

  const handleDrawerClose=()=>{
    setOpen(false);
  }

  const drWidth=240;


  
  // final render
  return (
    <div>
      <div>
        <AppBar
        position='fixed'
        open={open}
        >
          <Toolbar>
            <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{mr:2,...(open && {display: 'none'})}}
            >

            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Persistent drawer
            </Typography>
          </Toolbar>

        </AppBar>
        <Drawer
        sx={{width:drWidth,
          flexShrink:0,
          '& .MuiDrawer-paper':{
            width:drWidth,
            boxSizing:'border-box'
          }
        }}
        variant='persistent'
        anchor='left'
        open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction==='ltr'?<ChevronLeft/>:<ChevronRight />}
            </IconButton>
          </DrawerHeader>
        </Drawer>
        
      </div>
      

      <Stack spacing={0.5} direction='row' style={{ marginTop: '80px', marginLeft: '10px', height: '80px' }}>
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
      <Stack spacing={0.5} direction='row' style={{ marginTop: '10px', marginLeft: '10px', height: '80px' }}>
        <TextField
          value={chartLabel}
          label='Enter url for new datas for highcharts here'
          variant='outlined'
          style={{
            height: '40px',
            fontSize: '10px',
            padding: '0px',
            minWidth: '400px',
            maxWidth: '600px'

          }}
          onChange={(e) => {
            setChartLabel(e.target.value)
          }} />


        <Button
          className='urlButton'
          variant='contained'
          onClick={changeUrlChart}
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

      <div>
        <HighchartsReact highcharts={Highcharts} options={options1} />
      </div>
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
          onGridReady={(e)=>{setMarker(true)}}
        />
      </div>
      

    </div>
  );
}

export default App;
