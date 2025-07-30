import { ZapIcon } from "lucide-react";
import { MenuBar } from "../OS/drivers/MenuBar"
// import { WindowManagerRenderer } from "../OS/drivers/WindowManagerRenderer"
import RenderChildrenWindows from "../OS/drivers/RenderChildrenWindow";

import { useRef } from "react"

// ! Create Context for INSTALLED APPLICATION.
// ! Create createStore hooks for OS
export default function GUI({windowId, children, INSTALLED_APPLICATIONS}){
    // * useRef to get dynamic AppContent width and height css.
    const topBarRef = useRef();
    const botBarRef = useRef();
    return (
        <div
            style = {{
                position:"relative",
                width:"100%",
                height:"100%",
                display: "flex",
                flexDirection:"column",
                justifyContent: "flex-end",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                // backgroundColor: "white"
                // zIndex: 10
            }}
        >
            {/* <MenuBar menuItems={menuItems} /> */}
            {/* {children} */}
            {/* <WindowManagerRenderer.Hidden id={windowId}/> */}
            <TopBar menuItems={menuItems}/>
            <AppContent 
                style={{
                    backgroundColor: "pink",
                    zIndex:"1",
                    position:"relative",
                    width:"90%",
                    height:"90%",
                    border:"1px solid green",
                    overflow: "clip", //hidden
                }}
            >
                {/* {children} */}
                {/* <div style={{backgroundColor:"blue", width:"100%", height:"100%"}}></div> */}
                <RenderChildrenWindows id={windowId} INSTALLED_APPLICATIONS={INSTALLED_APPLICATIONS}/>
            </AppContent>
            <BotBar windowId={windowId}/>
        </div>
    )
}
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

export function AppWindowFrame({windowId, children, ...props}){
    return (
        <div
            style = {{
                position:"relative",
                width:"100%",
                height:"100%",
                display: "flex",
                flexDirection:"column",
                justifyContent: "flex-end",
                // backgroundColor: "rgba(255, 255, 255, 0.73)",
                backgroundColor: "white"
                // zIndex: 10
            }}
        >
            <TopBar menuItems={menuItems}/>
            <AppContent 
                style={{

                }}
            >
                {children}
            </AppContent>
            <BotBar windowId={windowId}/>
        </div>
    )
}
function TopBar({windowId, applicationId,  menuItems }){
    return (
        <MenuBar menuItems={menuItems} />
    )
}
function BotBar({windowId, applicationId}){
    return (
        <div>
            {/* <WindowManagerRenderer.Hidden id={windowId}/> */}
        </div>
    )
}
function AppContent({style, children}){
    return (
        <div
            style={style}
        >
            {children}
        </div>
    )
}

