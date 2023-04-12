import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import { useState, useEffect } from 'react';
import { Stack, TextField, Button } from '@mui/material';

export default function Charts(){
    const [urlHighcharts, setUrlHighcharts] = useState('http://62.216.33.167:21005/api/data?type=price&symbol=CLSK');
    const data1 = [];
    const [instate, setInstate] = useState({
        loading: false,
        closeData: null,
    });

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
            data: instate.dData,
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
        fetch(`${urlHighcharts}`)
          .then(result => result.json())
          .then(jsonData => {
            //console.log('done',jsonData)
            jsonData.data.forEach(item => {
              const Ddate = new Date(item.date);
    
              data1.push( {x:Ddate, open:item.open, high:item.high, low:item.low, close:item.close});
            });
            //console.log('done 2',data1)
            setInstate({ loading: false, dData: data1 })
          })
      }, [urlHighcharts]);
    
    
    
     
      const [chartLabel, setChartLabel] = useState('')
    
      
    
      const changeUrlChart = () => {
        setUrlHighcharts(chartLabel)
      }

      return(
        <div>
              <Stack spacing={0.5} direction='row' style={{ marginTop: '50px', marginLeft: '10px', height: '80px' }}>
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
        </div>
      )
  
}