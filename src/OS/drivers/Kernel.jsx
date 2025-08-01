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
                overflow: "scroll"
            }}
        >
        <TabSystem initialActiveTabId={"applications"}>

            
            <div>
                {/* {`props.message: ${message ? "" : message}`} */}
                <span style={{color:"green"}}> { "[App Rendered by window id]: " } </span>
                <span style={{color:"black"}}> { windowId } </span>
            </div>

            <div 
                style={{
                    width: "100%",
                    height: "20px",
                    display: "flex"

                }}
            >
                <TabSystem.Tab id={"windows"}>
                    windows
                </TabSystem.Tab>
                <TabSystem.Tab id={"applications"}>
                    applications
                </TabSystem.Tab>
            </div>

            <TabSystem.Panel id={"applications"}>
                <ShowApplicationsState applications={apps}/>
            </TabSystem.Panel>

            <TabSystem.Panel id={"windows"}>
                <PrintWindowsState windows={windows}/>
            </TabSystem.Panel>
            
            

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