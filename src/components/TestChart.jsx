import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import { useState,useEffect } from 'react';
import {Dialog,DialogTitle,Button,Stack} from '@mui/material';


export default function TestChart() {
    const [intradayData,setIntradayData]=useState('http://62.216.47.4:21005/api/tickers_intraday_data?ticker=BSX')
    const [urlForNews,setUrlForNews]=useState('http://62.216.47.4:21005/api/au_news_data')
    const [openDialog,setOpenDialog]=useState(false);
    const [titleDialog,setTitleDialog]=useState('')
    const [contentDialog,setContentDialog]=useState('')
    const [author,setAuthor]=useState('')
    const [showSent,setShowSent]=useState('')
    const [urlOfNews,setUrlOfNews]=useState('')
    const [tickersData,setTickersData]=useState([]);
    const [formattedData,setFormatedData]=useState([]);
    const [rowNews,setRowNews]=useState([]);
    const [chartNews,setChartNews]=useState([])
    const [testDates,setTestDates]=useState([])

    const someTwitt = 'i hate, Cats, they are totally!';

    const [testData, setTestData] = useState([
        {
            "_id": "6453a69309624a003fddf450",
            "x": 1672865940000,
            "gmtoffset": 0,
            "datetime": "2023-01-04 20:59:00",
            "open": 46.45,
            "high": 46.5,
            "low": 46.445,
            "close": 46.5,
            "volume": 160309,
            "ticker": "BSX",
            "createdAt": "2023-05-04T12:35:31.420Z",
            "updatedAt": "2023-05-04T12:35:31.420Z"
        },
        {
            "_id": "6453a69309624a003fddf451",
            "x": 1672932300000,
            "gmtoffset": 0,
            "datetime": "2023-01-05 15:25:00",
            "open": 46.375,
            "high": 46.375,
            "low": 46.34,
            "close": 46.34,
            "volume": 5314,
            "ticker": "BSX",
            "createdAt": "2023-05-04T12:35:31.420Z",
            "updatedAt": "2023-05-04T12:35:31.420Z"
        },
        {
            "_id": "6453a69309624a003fddf452",
            "x": 1672935900000,
            "gmtoffset": 0,
            "datetime": "2023-01-05 16:25:00",
            "open": 46.365,
            "high": 46.37,
            "low": 46.365,
            "close": 46.37,
            "volume": 2053,
            "ticker": "BSX",
            "createdAt": "2023-05-04T12:35:31.420Z",
            "updatedAt": "2023-05-04T12:35:31.420Z"
        },
        {
            "_id": "6453a69309624a003fddf453",
            "x": 1672939500000,
            "gmtoffset": 0,
            "datetime": "2023-01-05 17:25:00",
            "open": 46.275,
            "high": 46.29,
            "low": 46.275,
            "close": 46.29,
            "volume": 6099,
            "ticker": "BSX",
            "createdAt": "2023-05-04T12:35:31.420Z",
            "updatedAt": "2023-05-04T12:35:31.420Z"
        },
        {
            "_id": "6453a69309624a003fddf454",
            "x": 1672943100000,
            "gmtoffset": 0,
            "datetime": "2023-01-05 18:25:00",
            "open": 46.46,
            "high": 46.46,
            "low": 46.43,
            "close": 46.435,
            "volume": 5384,
            "ticker": "BSX",
            "createdAt": "2023-05-04T12:35:31.420Z",
            "updatedAt": "2023-05-04T12:35:31.420Z"
        },
        {
            "_id": "6453a69309624a003fddf455",
            "x": 1672946700000,
            "gmtoffset": 0,
            "datetime": "2023-01-05 19:25:00",
            "open": 46.27,
            "high": 46.28,
            "low": 46.235,
            "close": 46.245,
            "volume": 17091,
            "ticker": "BSX",
            "createdAt": "2023-05-04T12:35:31.420Z",
            "updatedAt": "2023-05-04T12:35:31.420Z"
        },
        {
            "_id": "6453a69309624a003fddf456",
            "x": 1672950300000,
            "gmtoffset": 0,
            "datetime": "2023-01-05 20:25:00",
            "open": 45.935,
            "high": 45.935,
            "low": 45.895,
            "close": 45.895,
            "volume": 19051,
            "ticker": "BSX",
            "createdAt": "2023-05-04T12:35:31.420Z",
            "updatedAt": "2023-05-04T12:35:31.420Z"
        },
        {
            "_id": "6453a69309624a003fddf457",
            "x": 1673016660000,
            "gmtoffset": 0,
            "datetime": "2023-01-06 14:51:00",
            "open": 45.69,
            "high": 45.71,
            "low": 45.66,
            "close": 45.69,
            "volume": 13104,
            "ticker": "BSX",
            "createdAt": "2023-05-04T12:35:31.420Z",
            "updatedAt": "2023-05-04T12:35:31.420Z"
        },
        {
            "_id": "6453a69309624a003fddf458",
            "x": 1673020260000,
            "gmtoffset": 0,
            "datetime": "2023-01-06 15:51:00",
            "open": 46.18,
            "high": 46.23,
            "low": 46.18,
            "close": 46.23,
            "volume": 7524,
            "ticker": "BSX",
            "createdAt": "2023-05-04T12:35:31.420Z",
            "updatedAt": "2023-05-04T12:35:31.420Z"
        },
        {
            "_id": "6453a69309624a003fddf459",
            "x": 1673023860000,
            "gmtoffset": 0,
            "datetime": "2023-01-06 16:51:00",
            "open": 46.12,
            "high": 46.13,
            "low": 46.1,
            "close": 46.12,
            "volume": 21159,
            "ticker": "BSX",
            "createdAt": "2023-05-04T12:35:31.420Z",
            "updatedAt": "2023-05-04T12:35:31.420Z"
        }
    ])
    
    async function getStarthistorycal(){
        fetch(intradayData).then(r=>r.json())
            .then(result=>result.data)
            .then(result=>{
                setTickersData(result)
                const datesArr=[]
                result.forEach(oneResult=>{
                    datesArr.push((oneResult.timestamp)*1000)
                })
                console.log(datesArr)
                setTickersData(result)
                setTestDates(datesArr);
            })
        
    }
    async function getStartForNews(){
        fetch(urlForNews).then(r=>r.json()).then(result=>{
            setRowNews(result.data)
        })
    }
    
   
    const options = {
        credits: {
            text: 'My Credits',

        },
        chart: {
            type: 'candlestick',
            zoom: 'x'
        },

        title: {
            text: 'Highcharts (open,close,high,low)'
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
                data: formattedData,
                id: 'dateSeries',

                cropThreshold: 1000000,
                events: {
                    click: function (event) {
                        console.log('here we have point', event.point)
                    }
                }

            }, {
                name: 'News',
                type: 'flags',
                data: chartNews,
                onSeries: 'dateSeries',
                shape: 'squarepin',
                accessibility: {
                    exposeAsGroupOnly: true,
                    description: 'Flagged events.'
                },
                events: {
                    click: function (event) {
                        console.log('here we have flag', event.point.options)
                        setAuthor(event.point.options.creator)
                        contentParser(event.point.options.content)
                        setContentDialog(contentParser(event.point.options.content))
                        setShowSent(event.point.options.sentiment)
                        setTitleDialog(event.point.options.titleOfNews)
                        setUrlOfNews(event.point.options.link)
                        setOpenDialog(true)
                    }
                }

            }
        ],

        xAxis: {
            minRange: 3600 * 1000, // one hour
            type: 'datetime',
        },
    };
    

    function formatNewsToFlags(newsArr,dates){
        let i=-1;
        const newFlags=newsArr.map(oneNews=>{
            i++;
            return({
                x: dates[i],
                title:oneNews.sentiment,
                text:(oneNews.source,' : ', oneNews.title),
                ticker:'BSX',
                creator:oneNews.creator,
                content:oneNews.content,
                link:oneNews.link,
                titleOfNews:oneNews.title,
                sentiment:oneNews.sentiment
            })
        })
        setChartNews(newFlags);
    }

    function formatIntradayForHighCharts(intraday){
        const result=intraday.map(oneIntraday=>{
            return ({
                x:(oneIntraday.timestamp)*1000,
                open:oneIntraday.open,
                close:oneIntraday.close,
                high:oneIntraday.high,
                low:oneIntraday.low,
                ticker:oneIntraday.ticker
            })
        })
        setFormatedData(result)
    }
    
    function contentParser(content){
        const preResult=content.replace(/\n/g,' \n ').split('\n');
        
        console.log('pre-result',preResult)
        const result=preResult.map(onePre=>{
            const one=<p>{onePre}</p>;
            return one;
        })

        return result;
    }

    useEffect(()=>{
        getStarthistorycal();
        getStartForNews();
    },[])
    
    useEffect(()=>{
        if((formattedData.length>0)&&(rowNews.length>0)&&(testDates.length>0)){
            formatNewsToFlags(rowNews,testDates)
        }
        // console.log('rowNews',rowNews);
        // console.log('formattedData',formattedData)
        // console.log('testData',testDates)
    },[formattedData,rowNews,testDates])
    
    useEffect(()=>{
        console.log('our data',tickersData)
        if(tickersData.length!==0){
            (formatIntradayForHighCharts(tickersData))
        }
        
    },[tickersData])

    return (
        <div>
            <Dialog open={openDialog} onClose={(e)=>{setOpenDialog(false)}}>
                <DialogTitle>{titleDialog}</DialogTitle>
                <Stack direction='row'>
                    {author}
                    {' Sentiment: '}
                    {showSent}
                </Stack>
                <a href={urlOfNews}>Tap to go news into source</a>
                {contentDialog}
                <Button variant='contained' onClick={()=>{setOpenDialog(false)}}>Close</Button>
            </Dialog>
            <h1>Hi! It's test page (now test news flags) </h1>
            <HighchartsReact
                highcharts={Highcharts}
                options={options} />
        </div>
    )
}