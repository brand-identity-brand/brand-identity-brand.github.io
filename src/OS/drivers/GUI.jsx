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
import DemoAppWindowFrame from "../demos/AppWindowFrame";
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
        <TabSystem initialActiveTabId={{default:"Cpu", toggleBotBar:"true", appName:"Kernel"}}>
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
                <TabSystem.Panel id={"Cpu"}>
                    <TabSystem.Panel id={{appName:"Kernel"}}>
                        <ApplicationManagerRenderer id={"Kernel"} windowId={windowId}/>
                    </TabSystem.Panel>
                    <TabSystem.Panel id={{appName:"Demo"}}>
                        Demo
                    </TabSystem.Panel>
                </TabSystem.Panel>
                <TabSystem.Panel id={"MemoryStick"}>
                    <ApplicationManagerRenderer id={"MemoryStick"} windowId={windowId}/>
                </TabSystem.Panel>
              </div>
          
              <ChildrenWindowsRenderer id={windowId}/>
            </AppWindowFrame.Mid>
            {/*
            * //! below  
            */}
            <TabSystem.Panel id={{toggleBotBar:"true"}} style={{position:"relative", height:"80px"}}>
                <DesktopBar windowId={windowId} tabId={{default:"MemoryStick", toggleBotBar:"false"}}
                    StartComponent={[<MemoryStick key={0}/>]} 
                    applicationIds={[
                        "DemoAppWindowFrame"
                    ]}
                >
                    {/* <MemoryStick/> */}
                </DesktopBar>
                <DesktopBar windowId={windowId}  tabId={{default:"Cpu", toggleBotBar:"false"}}
                    StartComponent={[<Cpu key={0}/>]} 
                    applicationIds={[
                        
                    ]}
                >
                    <AppWindowFrame.Bot.Square >
                        <TabSystem.Tab id={{appName:"Kernel"}}>
                            K
                        </TabSystem.Tab>
                    </AppWindowFrame.Bot.Square>
                    <AppWindowFrame.Bot.Square >
                        <TabSystem.Tab id={{appName:"Demo"}}>
                            D
                        </TabSystem.Tab>
                    </AppWindowFrame.Bot.Square>
                    
                    
                </DesktopBar>
            </TabSystem.Panel>
            {/*
            * //! below  
            */}
            <TabSystem.Panel id={{toggleBotBar:"false"}} style={{position:"relative", height:"40px"}}>
                <TabSystem.Panel  id={"MemoryStick"} style={{position:"relative", height:"40px"}}>
                    <DesktopBar windowId={windowId} tabId={{default:"MemoryStick", toggleBotBar:"true"}} 
                        StartComponent={[<MemoryStick key={0}/>]}
                        applicationIds={[

                        ]}
                    >
                        
                    </DesktopBar>
                </TabSystem.Panel>
                <TabSystem.Panel id={"Cpu"} style={{position:"relative", height:"40px"}}>
                    <DesktopBar windowId={windowId}  tabId={{default:"Cpu", toggleBotBar:"true"}} 
                        StartComponent={[<Cpu key={0}/>]} 
                        applicationIds={[
                            "DemoAppWindowFrame"
                        ]}
                    >
                        <AppWindowFrame.Bot.Square >
                        <TabSystem.Tab id={{appName:"Kernel"}}>
                            K
                        </TabSystem.Tab>
                    </AppWindowFrame.Bot.Square>
                    <AppWindowFrame.Bot.Square >
                        <TabSystem.Tab id={{appName:"Demo"}}>
                            D
                        </TabSystem.Tab>
                    </AppWindowFrame.Bot.Square>
                    </DesktopBar>
                </TabSystem.Panel>
            </TabSystem.Panel>
            <TabSystem.Panel id={{toggleBotBar:"true"}} style={{position:"relative", height:"40px"}}>
                <EmptyBar/>
            </TabSystem.Panel>
            {/*
            * //! above
            */}
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
function EmptyBar(){
    return (
        <AppWindowFrame.Bot>
            <AppWindowFrame.Bot.Square/>
            <AppWindowFrame.Bot.Border/>
        </AppWindowFrame.Bot> 
    )
}
function DesktopBar({
    StartComponent=[],
    children, 
    windowId, 
    tabId, 
    applicationIds,

}){
    return (
        <AppWindowFrame.Bot>
            <Start tabId={tabId}>
                {StartComponent}
                
            </Start>
            <AppWindowFrame.Bot.Border/>
            <AppTabs>
                {children}
            </AppTabs>
            <AppWindowFrame.Bot.Border/>
            <ChildrenWindowsTogglers windowId={windowId} applicationIds={applicationIds}/>
        </AppWindowFrame.Bot> 
    )
}
