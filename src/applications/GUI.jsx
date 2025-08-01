import { MenuBar } from "../OS/drivers/MenuBar"
import { WindowManagerRenderer } from "../OS/drivers/WindowManagerRenderer"

export default function GUI({windowId, renderChildrenWindow, children}){
    
    return (
        <div
            style = {{
                position:"fixed",
                top: 0,
                left: 0,
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
            {/* <MenuBar menuItems={menuItems} /> */}
            {/* {children} */}
            {/* <WindowManagerRenderer.Hidden id={windowId}/> */}
            <TopBar menuItems={menuItems}/>
            <AppContent 
                style={{

                }}
            >
                {children}
                {renderChildrenWindow()}
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

export function AppWindowFrame({windowId, children, renderChildrenWindow, ...props}){
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
                {renderChildrenWindow()}
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
            <WindowManagerRenderer.Hidden id={windowId}/>
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

