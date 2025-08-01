/**
 * ! This GUI component is meant to show an example of what a barebones "App" should look like.
 * ! using AppWindowFrame as the root container
 * ! using appsStore to manage  presistent states. 
 * ! using useState to manage runtime states. <- used by Tabs internally, // less common
 * ! this Component is an example of an erty app. the hub app. homepage. desktop
 * ! create at least one "App" app. 
 * ! demo save states glabbally and restore glabally.
 */
import AppWindowFrame from "./AppWindowFrame";
import { generateConfig } from "./AppWindowFrame";
import DemoAppWindowFrame from "../demos/DemoAppWindowFrame";
import { Cpu, MemoryStick } from "lucide-react";
import MenuBar from "./MenuBar";
import ChildrenWindowsRenderer from "./ChildrenWindowsRenderer";
import ChildrenWindowsControllerRenderer from "./AppWindowFrame/ChildrenWindowsControllerRenderer";
import TabSystem from "./TabSystem";


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
const config = (windowId) => generateConfig({
    top: { use: false },
    bot: {
        renderers: [
            {
                componentName: "Square",
                border: { right: true },
                children: <Cpu />
            },
            {
                componentName: "FillRect",
                border: { right: true },
                children: <>
                    <DemoAppWindowFrame.Icon windowId={windowId} />
                </>
            }
        ]
    }
})
export default function GUI({windowId, message}){
    return (
        <AppWindowFrame
            windowId={windowId}
            config={config(windowId)}
        >
        <TabSystem initialActiveTabId={"Cpu"}>
            <AppWindowFrame.Top>
                <MenuBar menuItems={menuItems}/>
            </AppWindowFrame.Top>

            <AppWindowFrame.Mid>
              <div 
                style={{
                  backgroundColor:"white", 
                  width:"100%", 
                  height:"100%", 
                  top: 0, left: 0, 
                  position:"absolute"
                }}
              >
                prop.message: {message}
                {/* {children} */}
                
                    
                    <TabSystem.Panel id={"Cpu"}>
                        "Cpu"
                        
                    </TabSystem.Panel>
                    
                    <TabSystem.Panel id={"MemoryStick"}>
                        "MemoryStick"
                    </TabSystem.Panel>
                
              </div>
          
              <ChildrenWindowsRenderer id={windowId}/>
            </AppWindowFrame.Mid>

            <div>
            {/* <DemoAppWindowFrameBar windowId={windowId} tabId={"MemoryStick"}/> */}
            <MasterBar windowId={windowId}  tabId={"Cpu"}/>
            </div>
        </TabSystem>
        </AppWindowFrame>
    )
}

function Start({tabId, children}){
    return (
        <AppWindowFrame.Bot.Square >
            <TabSystem.Tab id={tabId}>
                {children}
            </TabSystem.Tab>
        </AppWindowFrame.Bot.Square>
    )
}
function AppTabs({windowId, children}){
    return (
        <AppWindowFrame.Bot.FillRect>
            {/* <DemoAppWindowFrame.Icon windowId={windowId} /> */}
            {children}
        </AppWindowFrame.Bot.FillRect>
    )
}
function ChildrenWindowsTogglers({windowId}){
    return (
        <AppWindowFrame.Bot.FillRect>
            <ChildrenWindowsControllerRenderer id={windowId} />
        </AppWindowFrame.Bot.FillRect>
    )
}
function MasterBar({windowId, tabId="Cpu"}){
    return (
        <AppWindowFrame.Bot>
            <Start tabId={"Cpu"}>
                <Cpu/>
            </Start>
            <AppWindowFrame.Bot.Border/>
            <AppTabs>
                <DemoAppWindowFrame.Icon windowId={windowId} />
            </AppTabs>
            <ChildrenWindowsTogglers windowId={windowId}/>
        </AppWindowFrame.Bot> 
    )
}

function DemoAppWindowFrameBar({windowId, tabId}){
    return (
        <AppWindowFrame.Bot>
            <Start tabId={"Cpu"}>
                <MemoryStick />
            </Start>
            <AppWindowFrame.Bot.Border/>
            <AppTabs>
                <DemoAppWindowFrame.Icon windowId={windowId} />
            </AppTabs>
            <ChildrenWindowsTogglers windowId={windowId}/>
        </AppWindowFrame.Bot> 
    )
}

/*
<AppWindowFrame.Bot>
    <AppWindowFrame.Bot.Square >
            <Cpu />
    </AppWindowFrame.Bot.Square>
    <AppWindowFrame.Bot.Border/>
    <AppWindowFrame.Bot.FillRect>
        <DemoAppWindowFrame.Icon windowId={windowId} />
    </AppWindowFrame.Bot.FillRect>
    <AppWindowFrame.Bot.FillRect>
        // <DemoAppWindowFrame.Icon windowId={windowId} /> 
        <ChildrenWindowsControllerRenderer id={windowId} />
    </AppWindowFrame.Bot.FillRect>
</AppWindowFrame.Bot> 

*/