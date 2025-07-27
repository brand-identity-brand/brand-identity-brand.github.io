// import { useState } from 'react'

import reactLogo from '/react.svg';

import './App.css'
// import { Application } from './OS/drivers/Application';
import { WindowManager } from './OS/drivers/WindowManager';
// * OS const
import { DEFAULT_WINDOW_COMPONENT } from './OS/kernel/constants';
function App() {

  return (
    <div id={"root"}>
      <WindowManager id={"OS"} WindowComponent={DEFAULT_WINDOW_COMPONENT}/>
      {/* <img src={reactLogo}/> */}
    </div>
  )
}

export default App
