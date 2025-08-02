import useKernelContext from "../kernel/useKernelContext";
import  ChildrenWindowsRenderer from "./ChildrenWindowsRenderer";


export default function Kernel({children,applicationId,windowId, applicationRegistry,...props}){
    const {
        // passed via windowsStore
        message,
    } = props;
    
    const { hooks } = useKernelContext();
    const windows = hooks.windows.useWindowsState();
    const apps  = hooks.apps.useApplicationsState();
    
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
                    width: "100%",
                    height: "30px",
                    display: "flex",
                    // borderBottom: " 1px dotted black",
                }}
            >
                <TabSystem.Tab id={"windows"} style={{ fontSize: "20px", padding: "0px 20px 0px 20px",
                    active: {
                        boxSizing:"border-box",
                        borderTop: " 2px solid black",
                        borderLeft: " 2px solid black",
                        borderRight: " 2px solid black",
                        color: "black",
                        backgroundColor: "white"
                    },
                    inactive: {
                        borderBottom: " 2px solid black",
                        color: "black",
                        backgroundColor: "white"
                    }
                }}>
                    windows
                </TabSystem.Tab>
                <TabSystem.Tab id={"applications"} style={{ fontSize: "20px", padding: "0px 20px 0px 20px",
                    active: {
                        boxSizing:"border-box",
                        borderTop: " 2px solid black",
                        borderLeft: " 2px solid black",
                        borderRight: " 2px solid black",
                        color: "black",
                        backgroundColor: "white"
                    },
                    inactive: {
                        borderBottom: " 2px solid black",
                        color: "black",
                        backgroundColor: "white"
                    }

                }}>
                    applications
                </TabSystem.Tab>
            </div>

            <div 
                style={{
                    width: "100%",
                    height: "calc( 100% - 30px )",
                    // display: "flex",
                    // borderTop: " 1px dotted black",
                  
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

function StorePrinter({state, message=(key, state)=>`${key} ${ JSON.stringify(state[key]) }` }){
    const keys = Object.keys(state);
    const res = keys.map((key)=>{
        return  {
            id: key,
            message: message(key, state)
        }
    })
    return res;
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
import { MemoryStick } from "lucide-react";
Kernel.Tab = function (){
    return (
        <MemoryStick />
    )
}