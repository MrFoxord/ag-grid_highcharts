import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'
import { useState } from 'react';
import Sentiment from 'sentiment';


function testParse(ourTwitt){
    const someTwitt=ourTwitt
    const sentiment=new Sentiment()
    let result=sentiment.analyze(someTwitt)
    console.log('result of sentiment',result)
    return someTwitt

}

export default function TestChart() {
    const sss = 1
    const someTwitt = 'i hate, Cats, they are totally amazing!';

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
    const [testFlags, setTestFlags] = useState([
        {
            "_id": "6453a69309624a003fddf400",
            "x": 1672865940000,
            "title": 'News from BBC',
            "text": 'Some event with a description',
            "inside_news": {
                "aaa": "aaa",
                "bbb": "bbb"
            },
            "ticker": "BSX",
        },
        {
            "_id": "6453a69309624a003fddf451",
            "x": 1672932300000,
            "title": 'Some insider',
            "text": 'Some event with a description',
            "ticker": "BSX",
            "inside_news": {
                "aaa": "aaa",
                "bbb": "bbb"
            },
        },
        {
            "_id": "6453a69309624a003fddf452",
            "x": 1672935900000,
            "title": 'Some second insider',
            "text": 'Some event with a description',
            "ticker": "BSX",
            "inside_news": {
                "aaa": "aaa",
                "bbb": "bbb"
            },
        },
        {
            "_id": "6453a69309624a003fddf453",
            "x": 1672939500000,
            "title": 'BBC',
            "text": 'Some event with a description',
            "ticker": "BSX",
            "inside_news": {
                "aaa": "aaa",
                "bbb": "bbb"
            },
        },
        {
            "_id": "6453a69309624a003fddf454",
            "x": 1672943100000,
            "title": 'ICTV',
            "text": 'Some event with a description',
            "ticker": "BSX",
            "inside_news": {
                "aaa": "aaa",
                "bbb": "bbb"
            },
        },
        {
            "_id": "6453a69309624a003fddf455",
            "x": 1672946700000,
            "title": 6,
            "text": 'Some event with a description',
            "ticker": "BSX",
            "inside_news": {
                "aaa": "aaa",
                "bbb": "bbb"
            },
        },
        {
            "_id": "6453a69309624a003fddf456",
            "x": 1672950300000,
            "title": 7,
            "text": 'Some event with a description',
            "ticker": "BSX",
            "inside_news": {
                "aaa": "aaa",
                "bbb": "bbb"
            },
        },
        {
            "_id": "6453a69309624a003fddf457",
            "x": 1673016660000,
            "title": 8,
            "text": 'Some event with a description',
            "ticker": "BSX",
            "inside_news": {
                "aaa": "aaa",
                "bbb": "bbb"
            },
        },
        {
            "_id": "6453a69309624a003fddf458",
            "x": 1673020260000,
            "title": 9,
            "text": 'Some event with a description',
            "ticker": "BSX",
            "inside_news": {
                "aaa": "aaa",
                "bbb": "bbb"
            },
        },
        {
            "_id": "6453a69309624a003fddf459",
            "x": 1673023860000,
            "title": 10,
            "text": 'Some event with a description',
            "ticker": "BSX",
            "inside_news": {
                "aaa": "aaa",
                "bbb": "bbb"
            },
        }
    ])
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
                data: testData,
                id: 'dateSeries',

                cropThreshold: 1000000,
                events: {
                    click: function (event) {
                        console.log('here we have point', event.point)
                    }
                }

            }, {
                type: 'flags',
                data: testFlags,
                onSeries: 'dateSeries',
                shape: 'squarepin',
                width: 16,

                events: {
                    click: function (event) {
                        console.log('here we have flag', event.point.options)
                        const res=testParse(someTwitt);
                        console.log('our twitt',res)
                    }
                }

            }
        ],

        xAxis: {
            minRange: 3600 * 1000, // one hour
            type: 'datetime',
        },
    };

    return (
        <div>

            <h1>Hi</h1>
            <HighchartsReact
                highcharts={Highcharts}
                options={options} />
        </div>
    )
}