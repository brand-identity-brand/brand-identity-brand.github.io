// import { useState } from 'react'
import reactLogo from '/react.svg';
import './App.css';
// * OS const
import INSTALLED_APPLICATIONS from './applications/registry';
import OS from './OS';

import { windowsStore, appsStore } from './applications/store';

function App() {
  return (
    <OS 
      INSTALLED_APPLICATIONS={INSTALLED_APPLICATIONS}
      windowsStore={windowsStore}
      appsStore={appsStore}
    />
  )
}

export default App