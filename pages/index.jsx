import Head from "next/head";

// const inter = Inter({ subsets: ["latin"] });
// import { useContext, useEffect, useReducer, useState } from 'react';
import {useWindowManagerRegistryContext, useWindowManagerContext, WindowManagerProvider, Desktop, Start, Window } from 'react-desktop-environment';

export default function IndexWrapper({children}){

  return (
    <WindowManagerProvider id={'/index'}>
      <IndexFragement/>
    </WindowManagerProvider>
  )
}
function IndexFragement() {
  const { initWindow } = useWindowManagerRegistryContext();
  const { registerWindow } = useWindowManagerContext()
  return (<>
    <Head>
      <title>brand-identiy-brand.github.io</title>
      <meta name="description" content="brand-identiy-brand.github.io" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Desktop style={{ width: '100vw', height: 'calc( 100vh - 30px - 2px )', backgroundColor: 'white'}}>
      <button onClick={()=>{
            initWindow('idRef.current',{
                Component: 'Div',
                props: {
                    initialTitle : `title`,
                    initialPosition: {
                        left: 500,
                        top: 10
                    },
                    initialSize: {
                        width: 300,
                        height: 200
                    }
                },
            });
            registerWindow('idRef.current'); 
        // console.log(getAllWindowSpecs())
    }}> initWindow </button> 
    </Desktop>
    <Start/>
  </>);
}
