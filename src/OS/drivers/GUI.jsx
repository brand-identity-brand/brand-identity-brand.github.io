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
import Kernel from "./Kernel";
import ApplicationManagerRenderer from "./ApplicationManagerRenderer";

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
});

export default function GUI({windowId, message}){
    return (
        <AppWindowFrame
            windowId={windowId}
            config={config(windowId)}
        >
        <TabSystem initialActiveTabId={{default:"Cpu", toggleBotBar:"true"}}>
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
                {`{prop.message}: {message}`}
                <TabSystem.Panel id={"Cpu"} style={{position:"relative", width:"100%",height:"50%"}}>
                    <ApplicationManagerRenderer id={"Kernel"} windowId={windowId}/>
                </TabSystem.Panel>
                <TabSystem.Panel id={"MemoryStick"}>
                    <ApplicationManagerRenderer id={"MemoryStick"} windowId={windowId}/>
                </TabSystem.Panel>
              </div>
          
              <ChildrenWindowsRenderer id={windowId}/>
            </AppWindowFrame.Mid>

            <TabSystem.Panel id={{toggleBotBar:"true"}} style={{position:"relative", height:"80px"}}>
                <MemoryStickBar windowId={windowId} tabId={{default:"MemoryStick", toggleBotBar:"false"}} applicationIds={["DemoAppWindowFrame"]}/>
                <CpuBar windowId={windowId}  tabId={{default:"Cpu", toggleBotBar:"false"}} applicationIds={[]} />
            </TabSystem.Panel>
            {/*
            * //! below  
            */}
            <TabSystem.Panel id={{toggleBotBar:"false"}} style={{position:"relative", height:"40px"}}>
                <TabSystem.Panel id={"Cpu"} style={{position:"relative", height:"40px"}}>
                    <CpuBar windowId={windowId}  tabId={{default:"Cpu", toggleBotBar:"true"}} applicationIds={[]} />
                </TabSystem.Panel>
                
                <TabSystem.Panel  id={"MemoryStick"} style={{position:"relative", height:"40px"}}>
                    <MemoryStickBar windowId={windowId} tabId={{default:"MemoryStick", toggleBotBar:"true"}} applicationIds={["DemoAppWindowFrame"]}/>
                </TabSystem.Panel>
            </TabSystem.Panel>
            {/*
            * //! above
            */}
        </TabSystem>
        </AppWindowFrame>
    )
}

function Start({tabId, children}){
    return (
        <AppWindowFrame.Bot.Square >
            <TabSystem.Tab id={tabId.default}>
            <TabSystem.Tab id={{toggleBotBar: tabId.toggleBotBar}}>
                {children}
            </TabSystem.Tab>
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
function ChildrenWindowsTogglers({windowId, applicationIds}){
    return (
        <AppWindowFrame.Bot.FillRect>
            <ChildrenWindowsControllerRenderer id={windowId}  applicationIds={applicationIds}/>
        </AppWindowFrame.Bot.FillRect>
    )
}
// * ==usages
function CpuBar({windowId, tabId, applicationIds}){
    return (
        <AppWindowFrame.Bot>
            <Start tabId={tabId}>
                <Cpu/>
            </Start>
            <AppWindowFrame.Bot.Border/>
            <ChildrenWindowsTogglers windowId={windowId} applicationIds={applicationIds}/>
        </AppWindowFrame.Bot> 
    )
}

function MemoryStickBar({windowId, tabId, applicationIds}){
    return (
        <AppWindowFrame.Bot>
            <Start tabId={tabId}>
                <MemoryStick />
            </Start>
            <AppWindowFrame.Bot.Border/>
            <AppTabs>
                <DemoAppWindowFrame.Icon windowId={windowId} />
            </AppTabs>
            <AppWindowFrame.Bot.Border/>
            <ChildrenWindowsTogglers windowId={windowId} applicationIds={applicationIds}/>
        </AppWindowFrame.Bot> 
    )
}