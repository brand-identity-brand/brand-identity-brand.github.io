import ChildrenWindowsControllerRenderer from "./ChildrenWindowsControllerRenderer";
import MenuBar from "../MenuBar";
import ChildrenWindowsRenderer from "../ChildrenWindowsRenderer";
const menuItems = [
  {
    label: "File",
    items: [
      {
        label: "New",
        action: () => alert("New File"),
      },
      {
        label: "Open",
        items: [
          {
            label: "Project",
            action: () => alert("Open Project"),
          },
          {
            label: "Workspace",
            action: () => alert("Open Workspace"),
          },
        ],
      },
      {
        label: "Exit",
        action: () => alert("Exiting..."),
      },
    ],
  },
  {
    label: "Edit",
    items: [
      {
        label: "Undo",
        action: () => alert("Undo"),
      },
      {
        label: "Redo",
        action: () => alert("Redo"),
      },
      {
        label: "Preferences",
        items: [
          {
            label: "Theme",
            action: () => alert("Change Theme"),
          },
          {
            label: "Shortcuts",
            action: () => alert("Edit Shortcuts"),
          },
        ],
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Documentation",
        action: () => window.open("https://example.com/docs", "_blank"),
      },
      {
        label: "About",
        action: () => alert("This is a sample menu."),
      },
    ],
  },
];
import DemoAppWindowFrame from "../../demos/DemoAppWindowFrame";
import { Fragment } from "react";
var Containers = {
  Square: SquareContainer,
  FillRect: FillRectContainer
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
const ep  = () =>  ({
    windowId: "",
    config: generateConfig(config)
  }
)

export default function AppWindowFrame({children, ...props}){
    const {
      windowId,
      config = "default", 

    } = props;
    const configure = config === "default"
      ? generateDefaultConfig(windowId)
      : config
    ;

    const topBarHeight = configure.top.use? "22px" : "0px"; 
    const botBarHieght = configure.bot.use? "40px" : "0px"; 

    return (
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
            <div
                style={{ 
                    width: "100%", 
                    height: topBarHeight
                }}
            >
              
               <MenuBar menuItems={menuItems} />
            </div>
            <div 
                style={{
                    // flex: 1, 
                    zIndex:"1",
                    position:"relative",
                    width:"100%",
                    height:`calc( 100% - ${topBarHeight} - ${botBarHieght} )`,
                    overflow: "clip", //hidden
                    // display: 
                }}
            >
                <div 
                    style={{
                        backgroundColor:"white", 
                        width:"100%", 
                        height:"100%", 
                        top: 0, left: 0, 
                        position:"absolute"
                    }}
                >
                    {children}
                </div>
            
                <ChildrenWindowsRenderer id={windowId}/>
            </div>
            <div
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
                height: botBarHieght, 
                // decorations 
                borderTop: "2px solid black",
                backgroundColor: "white",
              }}
            >
              {configure.bot.renderers.map((renderer, index )=>{
                const { 
                  Component,
                  border,
                  children
                } = renderer;

                return (
                  <Fragment key={index}>
                    { border?.left && <Border width="2px" color="grey" /> }
                    <Component botBarHieght={botBarHieght}>
                      {children}
                    </Component>
                    { border?.right && <Border width="2px" color="grey" /> }
                  </Fragment>
                )
              })}

              {configure.auto.WindowsController &&
                <FillRectContainer>
                  {/* //TODO: turn this into spereate hidden and active. hidden list are shown by defult, while active is collapsed to the right side. */}
                  <ChildrenWindowsControllerRenderer id={windowId}/>
                </FillRectContainer>
              }
            </div>
        </div>
    )
}

function SquareContainer({children, botBarHieght, padding="10px"}){
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
        width: botBarHieght, 
        height: botBarHieght, 
      }}
    >
      {children}
    </div>
  )
}

function FillRectContainer({children, botBarHieght, paddingLR="10px"}){
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
        gap: "5px",
        // values 
        // flex: 1,
        // width: "100%", 
        height: botBarHieght, 
      }}
    >
      {children}
    </div>
  )
}
function Border({width="100%", height="100%", color= "pink"}){
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