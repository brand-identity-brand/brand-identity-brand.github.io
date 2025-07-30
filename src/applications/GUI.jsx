import HiddenWindows from "../OS/drivers/HiddenWindows";
import { MenuBar } from "../OS/drivers/MenuBar"

import RenderChildrenWindows from "../OS/drivers/RenderChildrenWindow";

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
// ! Create Context for INSTALLED APPLICATION.
// ! Create createStore hooks for OS
export default function GUI({windowId, children, INSTALLED_APPLICATIONS}){

    return (
        <div
            style = {{
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
                }}
            >
                <MenuBar menuItems={menuItems} />
            </div>
            <div 
                style={{
                    flex: 1, 
                    backgroundColor: "pink",
                    zIndex:"1",
                    position:"relative",
                    width:"100%",
                    // height:`calc( 100% - ${topBarHeight}px )`,
                    border:"1px solid green",
                    overflow: "clip", //hidden
                }}
            >
                {/* {children} */}
                <div style={{backgroundColor:"white", width:"100%", height:"100%"}}></div>
                <RenderChildrenWindows id={windowId} INSTALLED_APPLICATIONS={INSTALLED_APPLICATIONS}/>
            </div>
            <div style={{ width: '100%' }}>
                <HiddenWindows id={windowId}/>
            </div>
        </div>
    )
}


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

            <div
            >
                {children}
            </div>
            <div>
                <HiddenWindows id={windowId}/>
            </div>
        </div>
    )
}

