import './App.css';
import { useState, useEffect } from 'react';
import { Button, Drawer, AppBar, Toolbar, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material'
import Ag from './components/Ag.jsx';
import Parser from './components/Parser.jsx'
import OneChart from './components/OneChart.jsx';
import { Stack } from '@mui/material';
import TestChart from './components/TestChart.jsx'
import RealTimeFeeds from './components/RealTimeFeeds.jsx';
import TestNews from './components/TestNews.jsx';
function App() {

  const [stateMenu, setStateMenu] = useState(false)

  const openMenu = () => {
    setStateMenu(true)
  }
  const hideMenu = () => {
    setStateMenu(false)
  }


  const test = <div><TestChart/></div>
  const table = <div><Ag /></div>
  const chart = <div>
    <h2>Charts</h2>
    <Stack direction='row'>
      <OneChart />
      <OneChart />
    </Stack>
    <Stack direction='row'>
      <OneChart />
      <OneChart />
    </Stack>
  </div>;
  const wsTest=<div><RealTimeFeeds/></div>
  const parser = <div><Parser /></div>
  const news=<div><TestNews /></div>


  const [content, setContent] = useState(news)

  const changeToTable = () => {
    if (content !== table) {
      setContent(table)
    }
  }

  const changeToChart = () => {
    if (content !== chart) {
      setContent(chart)
    }
  }

  const changeToParser = () => {
    if (content !== table) {
      setContent(parser)
    }
  }
  const changeToTest=()=>{
    if(content!==test){
      setContent(test)
    }
  }
  const changeToWsTest=()=>{
    if(content!==wsTest){
      setContent(wsTest)
    }
  }
  const changeToNews=()=>{
    if(content!==news){
      setContent(news)
    }
  }
  useEffect(() => {
    console.log('changed')
  }, [content])
  // final render
  return (
    <div>
      <AppBar
        position='static'
        style={{
          height: '70px'
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu onClick={openMenu} />
          </IconButton>

        </Toolbar>
      </AppBar>

      <Drawer anchor='left' open={stateMenu} style={{ width: '300px' }} onClose={hideMenu}>
        <Menu size="large"
          edge="start"
          color="inherit"
          style={{ marginLeft: '30px', marginTop: '20px' }} onClick={hideMenu}>Hide</Menu>
        <Button variant='text'
          size="large"
          edge="start"
          color="inherit"
          style={{ marginTop: '20px' }}
          onClick={() => {
            changeToTable();
            hideMenu();

          }}>Tables</Button>

        <Button variant='text' size="large"
          edge="start"
          color="inherit"
          style={{ marginTop: '20px' }} onClick={() => {
            changeToChart();
            hideMenu();
          }} >Charts</Button>

        <Button variant='text' size="large"
          edge="start"
          color="inherit"
          style={{ marginTop: '20px' }} onClick={() => {
            changeToParser();
            hideMenu();
          }} >Parsing</Button>

          <Button variant='text' size="large"
          edge="start"
          color="inherit"
          style={{ marginTop: '20px' }} onClick={() => {
            changeToTest();
            hideMenu();
          }} >Test</Button>

          <Button variant='text' size="large"
          edge="start"
          color="inherit"
          style={{ marginTop: '20px' }} onClick={() => {
            changeToWsTest();
            hideMenu();
          }} >WebSocket</Button>

          <Button variant='text' size="large"
          edge="start"
          color="inherit"
          style={{ marginTop: '20px' }} onClick={() => {
            changeToNews();
            hideMenu();
          }} >TestNews</Button>
          
      </Drawer>

      {content}


    </div>
  );
}

export default App;