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

import DemoAppWindowFrame from "../demos/AppWindowFrame";
import { Cpu, MemoryStick } from "lucide-react";
import DropdownMenu from "./DropdownMenu";
import ChildrenWindowsRenderer from "./ChildrenWindowsRenderer";
import ChildrenWindowsControllerRenderer from "./AppWindowFrame/ChildrenWindowsControllerRenderer";
import TabSystem from "./TabSystem";
import Kernel from "./Kernel";
import ApplicationManagerRenderer from "./ApplicationManagerRenderer";
import { DatabaseZap } from "lucide-react";
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

export default function GUI({windowId, message}){
    return (
        <AppWindowFrame>
        <TabSystem initialActiveTabId={{default:"Cpu", toggleBotBar:"true", appName:"Demo"}}>
            <AppWindowFrame.Top>
                <DropdownMenu menuItems={menuItems}/>
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
                <TabSystem.Panel id={"Cpu"}>
                    <TabSystem.Panel id={{appName:"Kernel"}} >
                        {/*
                         * // ! the id must exist in applicationsStore for this Panel to render
                         */}
                        <ApplicationManagerRenderer id={"Kernel"} windowId={windowId}/>
                    </TabSystem.Panel>
                    <TabSystem.Panel id={{appName:"Demo"}}>
                        Demo
                    </TabSystem.Panel>

                </TabSystem.Panel>
              </div>
          
              <ChildrenWindowsRenderer id={windowId}/>
            </AppWindowFrame.Mid>
            {/*
            * //! below  
            */}
            <TabSystem.Panel id={{toggleBotBar:"true"}} style={{position:"relative", height:"40px"}}>
                <DesktopBar windowId={windowId}  tabId={{default:"Cpu", toggleBotBar:"false"}}
                    StartComponent={[<Cpu key={0}/>]} 
                    applicationIds={[
                        "DemoAppWindowFrame"
                    ]}
                >
                    <AppWindowFrame.Bot.Square padding="0px">
                        <TabSystem.Tab selectActiveIds={["appName"]}  id={{default: "Cpu", appName:"Kernel"}} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            {/* 
                             * // * for OS stores
                            */}
                            <Kernel.Tab/>
                        </TabSystem.Tab>
                    </AppWindowFrame.Bot.Square >                 
                </DesktopBar>
            </TabSystem.Panel>
            {/*
            * //! below  
            */}
            <TabSystem.Panel id={{toggleBotBar:"false"}} style={{position:"relative", height:"40px"}}>
                <TabSystem.Panel id={"Cpu"} style={{position:"relative", height:"40px"}}>
                    <DesktopBar windowId={windowId}  tabId={{default:"Cpu", toggleBotBar:"true"}} 
                        StartComponent={[<Cpu key={0}/>]} 
                        applicationIds={[
                            
                        ]}
                    >
                         <AppWindowFrame.Bot.Square padding="0px">
                            <TabSystem.Tab selectActiveIds={["appName"]} id={{default: "Cpu",appName:"Kernel"}} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                {/* 
                                * // * for OS stores
                                */}
                                <Kernel.Tab/>
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
GUI.displayName="GUI";
function Start({tabId, children}){
    return (
        <AppWindowFrame.Bot.Square padding="0px">
            {/* <TabSystem.Tab id={tabId.default}> */}
            <TabSystem.Tab selectActiveIds={["default"]} id={{default: tabId.default, toggleBotBar: tabId.toggleBotBar}} 
                style={{
                    display:"flex", justifyContent:"center", alignItems:"center",
                    active: {
                        backgroundColor: "black"
                    },
                    inactive: {
                        // color: "white",
                        // backgroundColor: "black"
                    }
                }}>
                {children}
            </TabSystem.Tab>
            {/* </TabSystem.Tab> */}
        </AppWindowFrame.Bot.Square>
    )
}
function AppTabs({children, tabId}){
    return (
        <AppWindowFrame.Bot.FillRect paddingLR="0px">
            {/* <TabSystem.Tab id={{toggleBotBar: tabId.toggleBotBar}}> */}
            {children}
            {/* </TabSystem.Tab> */}
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
            <AppWindowFrame.Bot.Border width="4px"/>
        </AppWindowFrame.Bot> 
    )
}
function DesktopBar({
    StartComponent=[],
    children, 
    windowId, 
    tabId, 
    applicationIds,
    //
    ...props
}){
    return (
        <AppWindowFrame.Bot {...props}>
            <Start tabId={tabId}>
                {StartComponent}
                
            </Start>
            <AppWindowFrame.Bot.Border width="4px"/>
            { children && <>
                <AppTabs tabId={tabId}>
                    {children}
                </AppTabs>
                <AppWindowFrame.Bot.Border width="4px"/>
            </>}
            <ChildrenWindowsTogglers windowId={windowId} applicationIds={applicationIds}/>
        </AppWindowFrame.Bot> 
    )
}
