import Head from "next/head";
import Image from "next/image";
// import { Inter } from "next/font/google";
import css from "./index.module.css";

// const inter = Inter({ subsets: ["latin"] });
import { useContext, useEffect, useReducer } from 'react';
import { WindowManagerContext, Window, Desktop, SpawnWindowButton, Start } from 'react-desktop-environment';

const appIconAlignemntStyles = {
  hide: { visibility: 'hidden' },
  auto: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: '2px',
    alignItems: 'flex-start', //alignment within lines
    alignContent: 'flex-start', //alignment amongst lines (wrapped)
  }
}

export default function Home({id=0}) {
  const { 
    getWindowsByParentId, 
    windowIdRef, 
    windowsTree,
    closeWindow,
    windowsRef, createWindow, windowToTop, getMinimisedWindowsInDesktop, useMinimise
  } = useContext(WindowManagerContext); 

  const { minimisedWindowIds, minimiseWindow, restoreMinimisedWindow } = useMinimise;

  const [ appIconAlignemntStyle, setAppIconAlignemntStyle ] = useReducer((state, type)=>{
    switch(type) {
      case 'hide': return appIconAlignemntStyles.hide
      case 'default': return appIconAlignemntStyles.auto
      default: return appIconAlignemntStyles.auto
    }
  }, appIconAlignemntStyles.auto);


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
        <div style={{
          height: '100%',
          width: '100%',
          ...appIconAlignemntStyle
        }}>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
          <AppIcon/>
        </div>
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
          <button onClick={()=>{setAppIconAlignemntStyle('hide')}}>
            hide icons
          </button>
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

function AppIcon(){
  return (
    <div style={{
      position: 'relative',
      height: '100px',
      width: '70px',
      // backgroundColor: 'red',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      // padding: '2px'
    }}>

      <div style={{
        position: 'relative',
        height: '70%',
        width: '100%',
        // backgroundColor: 'green',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'relative',
          // height: '80%',
          width: '80%',
          aspectRatio: ' 1 / 1 ',
          backgroundColor: 'red',
        }}>
        img
       </div>
      </div>
      <div style={{
        position: 'relative',
        height: '30%',
        width: '100%',
        backgroundColor: 'yellow',
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center'
      }}>
        <span style={{ fontFamily: 'seriff'}}> a very long title </span>
      </div>
    </div>
  )
}