import React from 'react';
import OneChart from './OneChart.jsx' 
import TableNews from './TableNews.jsx';
import { Stack } from '@mui/material';

export default function TestNews(){
    return (
        <div>
            <Stack direction='row'>
                <OneChart />
                <OneChart />
            </Stack>
            <Stack direction='row'>
                <OneChart />
                <OneChart />
            </Stack>
            <TableNews/>
        </div>
    )
}