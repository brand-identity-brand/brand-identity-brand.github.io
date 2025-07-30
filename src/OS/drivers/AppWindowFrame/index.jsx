import HiddenWindows from "../HiddenWindows";
import MenuBar from "../MenuBar";
import RenderChildrenWindows from "../RenderChildrenWindow";
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

export default function AppWindowFrame({windowId, children, topBar=true, botBar=true}){
    const topBarHeight = topBar? "22px" : 0;
    const botBarHieght = botBar?"40px":0;
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
            
                <RenderChildrenWindows id={windowId}/>
            </div>
            <div 
                style={{ 
                    boxSizing: "border-box",
                    width: '100%', 
                    height: botBarHieght 
                }}
            >
                <HiddenWindows id={windowId}/>
            </div>
        </div>
    )
}
