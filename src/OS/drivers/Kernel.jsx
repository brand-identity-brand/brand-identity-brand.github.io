import useKernelContext from "../kernel/useKernelContext";
import  ChildrenWindowsRenderer from "./ChildrenWindowsRenderer";


export default function Kernel({children,applicationId,windowId,...props}){
    const {
        // passed via windowsStore
        message,
    } = props;
    
    const { hooks, applicationRegistry } = useKernelContext();
    const windows = hooks.windows.useWindowsState();
    const apps  = hooks.apps.useApplicationsState();
    
    const cssTabs = {
        width:"auto",
        fontSize: "16px", 
        padding: "0px 20px 0px 20px",
        // fontFamily:"monospace",
        // textAlign:"baseline",
        active: {
            boxSizing:"border-box",
            color: "black",
            backgroundColor: "white",
            // borderRight: "1px dotted rgba(0, 72, 255, 0.47)",
        },
        inactive: {
            boxSizing:"border-box",
            color: "white",
            backgroundColor: "rgba(0, 72, 255, 0.47)",
            borderRight: " 1px dotted white",
        }
    }
    return (<>
        <div 
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                overflow: "hidden"
            }}
        >
        <TabSystem initialActiveTabId={"applications"}>

            
            {/* <div>
                <span style={{color:"green"}}> { "[App Rendered by window id]: " } </span>
                <span style={{color:"black"}}> { windowId } </span>
            </div> */}

            <div 
                style={{
                    boxSizing:"border-box",
                    width: "100%",
                    height: "30px",
                    display: "flex",
                    // borderBottom: " 1px dotted black",
                    // backgroundColor: "rgba(0, 72, 255, 0.47)"
                }}
            >
                <TabSystem.Tab id={"windows"} style={{ ...cssTabs }}>
                    windows
                </TabSystem.Tab>
                <TabSystem.Tab id={"applications"} style={{ ...cssTabs }}>
                    applications
                </TabSystem.Tab>
                <TabSystem.Tab id={"INSTALLED_APPLICATIONS"} style={{ ...cssTabs }}>
                    INSTALLED_APPLICATIONS
                </TabSystem.Tab>
            </div>

            <div 
                style={{
                    boxSizing: "border-box0",
                    width: "100%",
                    height: "calc( 100% - 30px )",
                    // display: "flex",
                    // borderTop: " 2px dashed white",
                    padding: "20px"
                }}
            >
                {/**
                 * // ! scroll
                 */}
                <TabSystem.Panel id={"applications"} style={{overflow:"scroll"}}>
                    <ShowApplicationsState applications={apps}/>
                </TabSystem.Panel>

                <TabSystem.Panel id={"windows"}  style={{overflow:"scroll"}}>
                    <PrintWindowsState windows={windows}/>
                </TabSystem.Panel>

                <TabSystem.Panel id={"INSTALLED_APPLICATIONS"}  style={{overflow:"scroll"}}>
                    {/* <PrintWindowsState windows={windows}/> */}
                   
                    <ShowApplicationRegistry applicationRegistry={applicationRegistry}/>
                </TabSystem.Panel>
            </div>
            
            
            

            {/* <div style={{borderTop:"20px solid black"}}/> */}

        </TabSystem>   
        </div>

        { windowId === "Kernel" 
            && <div
                style={{
                    position: "fixed",
                    width: "100%",
                    height: "100%"
                }}
            >
                <ChildrenWindowsRenderer id={windowId}  WindowComponent={DefaultWindowComponent}/>
            </div>
        }
    </>)
};

import ReactJsonView from '@microlink/react-json-view';
import TabSystem from "./TabSystem";

function ShowApplicationsState({applications}){
    
    return (
        <ReactJsonView 
            showComma
            src={applications}
        />
        // <div>
        //     {StorePrinter({state: applications}).map(application => {
        //         return <div key={application.id}>{application.message}</div>
        //     })}
        // </div>
    )
}

function PrintWindowsState({windows}){
    return (
        <ReactJsonView 
            showComma
            src={windows}
        />  
    )
}
function ShowApplicationRegistry({applicationRegistry}){
    return (
        <ReactJsonView 
            showComma
            src={applicationRegistry}
        />  
    )
}
function DefaultWindowComponent({children, zIndex, style, ...props}){
    return (
        <div {...props}
            style={{
                position: "fixed",
                width: "100%",
                height: "100%"
                // zIndex:zIndex
            }}
        >
            {children}
        </div>
    )
}

// MemoryStick as icon
// TODO. rename to icon
import { MemoryStick } from "lucide-react";
Kernel.Tab = function (){
    return (
        <MemoryStick />
    )
}