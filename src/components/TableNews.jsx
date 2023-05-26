import React from 'react';
import {ListItem,ListItemButton,ListItemText,Button,Dialog,DialogTitle,Typography,Stack,Divider} from '@mui/material'
import { FixedSizeList } from 'react-window';
import { useState,useEffect } from 'react';





export default function TableNews(){


    const [tableCount,setTableCount]=useState(200)
    const [openDialog,setOpenDialog]=useState(false)
    const [titleDialog,setTitleDialog]=useState('')
    const [contentDialog,setContentDialog]=useState('')
    const [startNewsUrl,setStartNewsUrl]=useState('http://62.216.47.4:21005/api/au_news_data?')
    const [startNumber,setStartNumber]=useState(200);
    const [creatorDialog,setCreatorDialog]=useState('')
    const [linkDialog,setLinkDialog]=useState('')
    const [sourceDialog,setSourceDialog]=useState('')
    const [sentimentDialog,setSentimentDialog]=useState('')
    const [getAtOnce,setGetAtOnce]=useState(200)

    const [newsData,setNewsData]=useState([ {
        _id: "0",
        link: "",
        source: "",
        title: "Loading news",
        pubDate: "0 0 0 0 0 0 0 0 ",
        creator: "",
        content: "",
        createdAt: "",
        updatedAt: "",
        sentiment:''
    },])
    useEffect(()=>{
        if(newsData.length===1){
            firstNews()
            
            console.log('now news',newsData)
        }
    },[])
    useEffect(()=>{
        console.log('news data is',newsData)
    },[newsData])

    function firstNews(){
        const returnArray=[]
        const fullUrl=`${startNewsUrl}$sort[pubDate]=-1&$limit=${startNumber}`
        fetch(fullUrl)
            .then(result=>{console.log('result of fetch',result);return result.json()})
            .then(result=>{
                console.log('JSON result is',result)
                result.data.forEach(oneResult=>{
                    returnArray.push(oneResult)
                })
                console.log('returnArray is',returnArray)
                setNewsData(returnArray)
            })
    }

    function contentParser(content){
        const preResult=content.replace(/\n/g,' \n ').split('\n');
        const result=preResult.map(onePre=>{
            const one=<p>{onePre}</p>;
            return one;
        })

        return result;
    }

    function addMoreNews(){
        
        const needNews=tableCount+getAtOnce;
        const limit=getAtOnce;
        const skip=needNews-limit;
        setTableCount(needNews);
        const newNews=newsData
        
        const fullUrl=`${startNewsUrl}$skip=${skip}&$limit=${limit}&$sort[pubDate]=-1`
        console.log(fullUrl)
        fetch(fullUrl).then(r=>r.json()).then(result=>{
            console.log('data',result)
            result.data.forEach(oneData=>{
                newNews.push(oneData)
            })
            setNewsData(newNews);
        })
    }

    function renderRow(props){
        const {index,style,data}=props;
        
        let thisTitle=''
        let thisContent=''
        let thisTime=''
        let thisDate=''
        let parsedDate=''
        let thisSentiment=0
        let thisCreator=''
        let thisSource=''
        let thisLink=''
        if(data[index]===undefined){
            
            console.log('undone')
            thisTitle='no data'
            thisContent='no content'
        }
        else{
            console.log('done')
            thisTitle=data[index].title
            thisContent=contentParser(data[index].content)
            parsedDate=data[index].pubDate.split(' ')
            thisDate= parsedDate[1] + ' ' + parsedDate[2] + ' ' + parsedDate[3]
            thisTime=parsedDate[4]
            thisSentiment=data[index].sentiment
            thisCreator=data[index].creator
            thisSource=data[index].source
            thisLink=data[index].link

        }
        return (
            <ListItem
                key={index}
                style={style}
                componend='div'
                dissablePadding
            >
                <ListItemButton>
                    <ListItemButton onClick={()=>{
                        setContentDialog(thisContent);
                        setTitleDialog(thisTitle)
                        setSentimentDialog(thisSentiment)
                        setCreatorDialog(thisCreator)
                        setLinkDialog(thisLink)
                        setSourceDialog(thisSource)
                        setOpenDialog(true)
                    }}> <Stack direction='row'>
                            <div style={{paddingRight:'10px'}}>
                                <Typography style={{width:'100px'}}>{thisDate}</Typography>
                                <Typography>{thisTime}</Typography>
                            </div>
                            <div>
                                <Typography style={{width:'100px'}}>sentiment:</Typography>
                                <Typography style={{width:'100px'}}>{thisSentiment}</Typography>
                            </div>
                            <ListItemText primary={` ${thisTitle}`}/>
                        </Stack>
                        <Divider/>
                    </ListItemButton>
                </ListItemButton>
                
    
            </ListItem>
        )
    }

    return(
        <div>
        <Divider/>
        <h1>News </h1>
        <Button variant="contained" onClick={()=>{addMoreNews()}}>+add more news</Button>
        <div>
            
            <Dialog open={openDialog} onClose={()=>{setOpenDialog(false)}}>
                <DialogTitle>
                    <Typography variant="h4" gutterBottom>{titleDialog}</Typography> 
                </DialogTitle>
                <Divider/>
                <Typography variant="h5" gutterBottom>Creator: {creatorDialog}</Typography>
                <Typography variant="h6" gutterBottom>Sentiment: {sentimentDialog}</Typography>
                <Typography variant="h6" gutterBottom>Source: {sourceDialog}</Typography>
                <Typography  variant="h6" gutterBottom><a href={linkDialog}>tap to go source news</a></Typography>
                <Divider/>
                <Typography variant="body1" gutterBottom>
                {contentDialog}
                </Typography>
                <Button variant='contained' onClick={()=>{setOpenDialog(false)}}>Close</Button>
            </Dialog>
            <FixedSizeList
                height={500}
                width={1200}
                itemSize={60}
                itemCount={newsData.length}
                itemData={newsData}
                overscanCount={5}
            >
                {renderRow}
            </FixedSizeList>
     
        </div>
        </div>
    )
}