import Head from "next/head";
import Image from "next/image";
// import { Inter } from "next/font/google";
import css from "./index.module.css";

// const inter = Inter({ subsets: ["latin"] });
import { useContext, useEffect } from 'react';
import { WindowManagerContext, Window, Desktop, SpawnWindowButton, Start } from 'react-desktop-environment';

export default function Home({id=0}) {
  const { 
    getWindowsByParentId, 
    windowIdRef, 
    windowsTree,
    closeWindow,
    windowsRef, createWindow, windowToTop, getMinimisedWindowsInDesktop, useMinimise
  } = useContext(WindowManagerContext); 
  const { minimisedWindowIds, minimiseWindow, restoreMinimisedWindow } = useMinimise;

  return (<>
    <Head>
      <title>brand-identiy-brand.github.io</title>
      <meta name="description" content="brand-identiy-brand.github.io" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={`${css.viewport}`}
      style={{
        background: 'white'
      }}
    >
      <Desktop id={id} className={`${css.Desktop}`} minimisedWindowIds={minimisedWindowIds} 
        style={{
          zIndex: 1, 
          height: 'calc( 100% - 30px - 2px )',
          width: '100%'
        }}
      >
      </Desktop>
      <Start.Bar style={{zIndex: 2}}>
        <Start.Menu>
          <div>settings</div>
          <div>logout</div>
        </Start.Menu>
        <Start.Icons className={css['Start-Icons']}>
          <div>{'||'}</div>
          <button 
            onClick={()=>{
              createWindow(Window,{
                initialPosition:{left: 50, top:50},
                initialSize:{width: 400, height: 300},
                minSize:{width: 400, height: 300},
                minimiseWindow: minimiseWindow, //TODO: api change. ?
                title:'3IIIIIIIID' //TODO: api change. title to initialTitle
              },id)
            }}
          > A </button>
          <div>{'||'}</div>
        </Start.Icons>
        <Start.Windows>
          { getMinimisedWindowsInDesktop(id, minimisedWindowIds).map(minimisedWindowId=>{
            const { props } = windowsRef.current[minimisedWindowId];
            return (
                <Start.Windows.Minimised
                  key={minimisedWindowId}
                  onClick={()=>{
                    windowToTop(minimisedWindowId);
                    restoreMinimisedWindow(minimisedWindowId);
                  }}
                >
                    {`${props.title}`}
                </Start.Windows.Minimised>
            )
          })}
        </Start.Windows>
        <Start.Footer>
            
        </Start.Footer>
      </Start.Bar>
    </main>
  </>);
}
