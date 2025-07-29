// import { useState } from 'react'

import reactLogo from '/react.svg';

import './App.css'
// import { Application } from './OS/drivers/Application';
import { WindowManagerRenderer } from './OS/drivers/WindowManagerRenderer';
import ApplicationManagerRenderer from './OS/drivers/ApplicationManagerRenderer';

// * OS const
import INSTALLED_APPLICATIONS from './applications/registry';
import OS from './OS';

function App() {

  return (
    <OS 
      INSTALLED_APPLICATIONS={INSTALLED_APPLICATIONS} 
      // ROOT_WINDOW_ID={"GUI"}
    />
  )
}

export default App

//! refactored to OS/index.jsx
// // import { Application } from './OS/drivers/Application';
// import { WindowManagerRenderer } from './OS/drivers/WindowManagerRenderer';
// import ApplicationManagerRenderer from './OS/drivers/ApplicationManagerRenderer';

// // * OS const
// import INSTALLED_APPLICATIONS from './applications/registry';

// function App() {

//   return (
//     <div id={"root"} style={{backgroundColor:"#ff00008f"}}>
//       <WindowManagerRenderer id={"OS"} 
//         renderApplication={({id})=>{
//           return (
//             <ApplicationManagerRenderer id={id} INSTALLED_APPLICATIONS={INSTALLED_APPLICATIONS}/>
//           )
//           // return <>
//           //   <ApplicationManagerRenderer id={id} INSTALLED_APPLICATIONS={INSTALLED_APPLICATIONS}/>
//           //   {/* //! this part should be handled by either WindowManager or Application. not the rendering */}
//           //   {/* <WindowManagerRenderer.Hidden id={id}/> */}
//           // </>
//         }}
//       />
      
//       {/* <img src={reactLogo}/> */}
//     </div>
//   )
// }
