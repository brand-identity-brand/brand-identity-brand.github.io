import ChildrenWindowsControllerRenderer from "./ChildrenWindowsControllerRenderer";
import { createContext, Fragment, useContext } from "react";

const AppWindowFrameContext = createContext(null);
export default function AppWindowFrame({children, ...props}){
    const {
      config = {
        top: { use: true },
        bot: { use: true }
      }
    } = props;
    const _config = {
      top: { use: true },
      bot: { use: true },
      ...config
    }
    return (<AppWindowFrameContext.Provider value={{config:_config}}>
        <div
            style = {{
                boxSizing: "border-box",
                // * absolute will look for ----- so it disregarded the no height/width immidiate parent
                position: "absolute", //"relative",
                width:"100%",
                height:"100%",
                display: "flex",
                flexDirection:"column",
                justifyContent: "flex-start", // <- updated from "flex-end"

                backgroundColor: "rgba(255, 255, 255, 0.95)",
                // backgroundColor: "white"
                // zIndex: 10
            }}
        >
          { children }

        </div>
    </AppWindowFrameContext.Provider>)
}
AppWindowFrame.Top = function Top({ children}){
  const { config } = useContext(AppWindowFrameContext);
  const height = config.top.use? "22px" : "0px";
  return (
    <div
      style={{ 
          width: "100%", 
          height: height
      }}
    >
      
      {children}
    </div>
  )
}
AppWindowFrame.Mid = function Mid({  children}){
  const { config } = useContext(AppWindowFrameContext);
  const topBarHeight = config.top.use? "22px" : "0px"; 
  const botBarHeight = config.bot.use? "40px" : "0px"; 
  return (
    <div 
      style={{
          // flex: 1, 
          zIndex:"1",
          position: "relative",
          // width:"100%",
          height: `calc( 100% - ${topBarHeight} - ${botBarHeight} )`,
          overflow: "clip", //hidden
          // display: 
      }}
    >
      {children}
    </div>
  )
}
AppWindowFrame.Bot = function Bot({children, ...props }){
  const { config } = useContext(AppWindowFrameContext);
  const height = config.bot.use? "40px" : "0px";
  return (
    <div {...props}
      style={{
        // master behaviours
        position: "relative",
        boxSizing: "border-box",
        // slave behaviours
        display: "flex",
        flexDirection:"row",
        justifyContent: "flex-start",
        alignItems: "center",
        // values
        width: '100%', 
        height: height,
        // decorations 
        borderTop: "2px solid black",
        // backgroundColor: "white",
      }}
    >
      {children}
    </div>
  )
}

function RenderWindowButtons({renderers, botBarHeight}){
  return (<>
    {renderers.map((renderer, index )=>{
      const { 
        Component,
        border,
        children
      } = renderer;

      return (
        <Fragment key={index}>
          { border?.left && <Border width="2px" color="grey" /> }
          <Component botBarHeight={botBarHeight}>
            {children}
          </Component>
          { border?.right && <AppWindowFrame.Bot.Border width="2px" color="grey" /> }
        </Fragment>
      )
    })}
  </>)
}
AppWindowFrame.Bot.Square = function SquareContainer({children, padding="10px"}){
  const { config } = useContext(AppWindowFrameContext);
  const height = config.bot.use? "40px" : "0px";
  return (
    <div
      style={{
        // master behaviours
        position: "relative",
        boxSizing: "border-box",
        overflow: "clip", //hidden
        padding: padding,
        // slave behaviours
        display: "flex",
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
        // values 
        width: height,
        height: height
      }}
    >
      {children}
    </div>
  )
}

AppWindowFrame.Bot.FillRect = function FillRectContainer({children, paddingLR="10px"}){
  const { config } = useContext(AppWindowFrameContext);
  const height = config.bot.use? "40px" : "0px";
  return (
    <div
      style={{
        // master behaviours
        position: "relative",
        boxSizing: "border-box",
        // overflow: "scroll",//"clip", //hidden
        overflowY: "auto",
        overflowX: "clip",
        paddingLeft: paddingLR,
        paddingRight: paddingLR,
        // slave behaviours
        display: "flex",
        flexDirection:"row",
        justifyContent: "flex-start",
        alignItems: "center",
        // gap: "5px",
        // values 
        // flex: 1,
        // width: "100%", 
        height: height,
      }}
    >
      {children}
    </div>
  )
}
AppWindowFrame.Bot.Border = function Border({
  width="2px"/*"100%"*/, 
  height="100%", 
  color= "black",//"pink"
}){
  return <div
    style={{
      // master behaviours
      position: "relative",
      boxSizing: "border-box",
      height: height,
      width: width,
      // decorations 
      backgroundColor: color,
    }}
  />
}