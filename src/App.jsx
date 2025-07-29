// import { useState } from 'react'

import reactLogo from '/react.svg';

import './App.css'
// import { Application } from './OS/drivers/Application';
import { WindowManagerRenderer } from './OS/drivers/WindowManagerRenderer';
import ApplicationManagerRenderer from './OS/drivers/ApplicationManagerRenderer';

// * OS const
import { DEFAULT_WINDOW_COMPONENT } from './OS/constants';
import INSTALLED_APPLICATIONS from './applications/registry';

function App() {

  return (
    <div id={"root"} style={{backgroundColor:"#ff00008f"}}>
      <WindowManagerRenderer id={"GUI"} 
        WindowComponent={DEFAULT_WINDOW_COMPONENT} 
        renderApplication={({id})=>{
          return <ApplicationManagerRenderer id={id} INSTALLED_APPLICATIONS={INSTALLED_APPLICATIONS}/>
          // return "windowId: " + id
        }}
      />

      {/* <img src={reactLogo}/> */}
    </div>
  )
}

export default App
