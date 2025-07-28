// import { useState } from 'react'

import reactLogo from '/react.svg';

import './App.css'
// import { Application } from './OS/drivers/Application';
import { WindowManagerRenderer } from './OS/drivers/WindowManagerRenderer';
// * OS const
import { DEFAULT_WINDOW_COMPONENT } from './OS/constants';
function App() {

  return (
    <div id={"root"} style={{backgroundColor:"#ff00008f"}}>
      <WindowManagerRenderer id={"GUI"} WindowComponent={DEFAULT_WINDOW_COMPONENT}>
        start bar here
      </WindowManagerRenderer >
      {/* <img src={reactLogo}/> */}
    </div>
  )
}

export default App
