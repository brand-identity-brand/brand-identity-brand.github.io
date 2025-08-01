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
        {windowId === "Kernel"
            ? <>
            <div 
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }}
            >
                <div>
                    {`props.message: ${message}`}
                    {`rendered by window id: ${windowId}`}
                </div>
                <div style={{borderTop:"20px solid black"}}/>
                <div>
                    {StorePrinter({state: apps}).map(application => {
                        return <div key={application.id}>{application.message}</div>
                    })}
                </div>
                <div style={{borderTop:"20px solid black"}}/>
                <div>
                    {StorePrinter({state: windows}).map(window => {
                        return <div key={window.id}>{window.message}</div>
                    })}
                </div>
            </div>
            <div
                style={{
                    position: "fixed",
                    width: "100%",
                    height: "100%"
                }}
            >
                    <ChildrenWindowsRenderer id={windowId}  WindowComponent={DefaultWindowComponent}/>
                </div>
            </>
            : <div 
                style={{
                    position: "relative",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }}
            >
                <div>
                    {`props.message: ${message}`}
                    {`rendered by window id: ${windowId}`}
                </div>
                <div style={{borderTop:"20px solid black"}}/>
                <div>
                    {StorePrinter({state: apps}).map(application => {
                        return <div key={application.id}>{application.message}</div>
                    })}
                </div>
                <div style={{borderTop:"20px solid black"}}/>
                <div>
                    {StorePrinter({state: windows}).map(window => {
                        return <div key={window.id}>{window.message}</div>
                    })}
                </div>
            </div>}
    </>)
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