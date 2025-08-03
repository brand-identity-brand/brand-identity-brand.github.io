// import { useState } from 'react'
import reactLogo from '/react.svg';
import './App.css';
// * OS const
import INSTALLED_APPLICATIONS from './applications/registry';
import { windowsStore, appsStore } from './applications/store';

import OS from './OS';



function App() {
  return (
    <OS 
      // demo={true}
      INSTALLED_APPLICATIONS={INSTALLED_APPLICATIONS}
      windowsStore={windowsStore}
      appsStore={appsStore}
    />
  )
}

export default App