import ChildrenWindowsControllerRenderer from "./ChildrenWindowsControllerRenderer";
import { createContext, Fragment, useContext } from "react";
var Containers = {
  Square: AppWindowFrame.Bot?.Square,
  FillRect: AppWindowFrame.Bot?.FillRect
}
var generateDefaultConfig = (windowId) =>( {
  auto: { WindowsController: true },
  top: {
    use: true,
    renderer: []
  },
  bot: {
    use: true,
    renderers: [
      {
        Component: Containers["Square"],
        border: { right: true },
        children: <DemoAppWindowFrame.Icon /> // should be React Elements, array is an accepted value. using it as zero
      },
      {
        Component: Containers["FillRect"],
        border: { right: true },
        children: <>
          <DemoAppWindowFrame.Icon />
          <DemoAppWindowFrame.Icon />
          <DemoAppWindowFrame.Icon />
        </>
      },
      {
      Component: Containers["FillRect"],
        children: <>
          <ChildrenWindowsControllerRenderer id={windowId}/>
          <ChildrenWindowsControllerRenderer id={windowId}/>
          <ChildrenWindowsControllerRenderer id={windowId}/>
          <ChildrenWindowsControllerRenderer id={windowId}/>
          <ChildrenWindowsControllerRenderer id={windowId}/>
          <ChildrenWindowsControllerRenderer id={windowId}/>
          <ChildrenWindowsControllerRenderer id={windowId}/>
          <ChildrenWindowsControllerRenderer id={windowId}/>
        </>
      }
    ]
  }
})
export function generateConfig(config){
  return {
    auto: { WindowsController: true },
    top: {
      use: config?.top?.use ?? true,
      renderers: config?.top?.renderers ?? []
    },
    bot: {
      use: config?.bot?.use ?? true,
      //TODO: support multiple bars
      renderers:  config?.bot?.renderers 
        ? config.bot.renderers.map((item)=>({
          Component: Containers[item.componentName],
          border: { 
            left: item?.border?.left ?? false,
            right: item?.border?.right ?? false
          },
          children: item?.children ?? [],
        }))
        : [],      
    }
  }
}
// const ep  = () =>  ({
//     windowId: "",
//     config: generateConfig(config)
//   }
// )


const AppWindowFrameContext = createContext(null);
export default function AppWindowFrame({children, ...props}){
    const {
      windowId,
      config = "default", 

    } = props;
    const configure = config === "default"
      ? generateDefaultConfig(windowId)
      : config
    ;

    return (<AppWindowFrameContext.Provider value={{configure}}>
        <div
            style = {{
                boxSizing: "border-box",
                position:"relative",
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
            {/* 
            <AppWindowFrame.Bot>
              <BotBarItems windowId={windowId} height={botBarHeight} configure={configure}/>
            </AppWindowFrame.Bot> 
            */}
        </div>
    </AppWindowFrameContext.Provider>)
}
AppWindowFrame.Top = function Top({ children}){
  const { configure } = useContext(AppWindowFrameContext);
  const height = configure.top.use? "22px" : "0px";
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
  const { configure } = useContext(AppWindowFrameContext);
  const topBarHeight = configure.top.use? "22px" : "0px"; 
  const botBarHeight = configure.bot.use? "40px" : "0px"; 
  return (
    <div 
      style={{
          // flex: 1, 
          zIndex:"1",
          position:"relative",
          width:"100%",
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
  const { configure } = useContext(AppWindowFrameContext);
  const height = configure.bot.use? "40px" : "0px";
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
// function BotBarItems({windowId}){
//   const { configure } = useContext(AppWindowFrameContext);
//   const height = configure.bot.use? "40px" : "0px";
//   return (<>
//       <RenderWindowButtons renderers={configure.bot.renderers} botBarHeight={height} />
//       {configure.auto.WindowsController &&
//         <FillRectContainer>
//             {/* //TODO: turn this into spereate hidden and active. hidden list are shown by defult, while active is collapsed to the right side. */}
//             <ChildrenWindowsControllerRenderer id={windowId}/>
//         </FillRectContainer>
//       }
//   </>)
// }
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
  const { configure } = useContext(AppWindowFrameContext);
  const height = configure.bot.use? "40px" : "0px";
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
  const { configure } = useContext(AppWindowFrameContext);
  const height = configure.bot.use? "40px" : "0px";
  return (
    <div
      style={{
        // master behaviours
        position: "relative",
        boxSizing: "border-box",
        overflow: "scroll",//"clip", //hidden
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