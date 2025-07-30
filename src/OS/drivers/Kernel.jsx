import RenderChildrenWindows from "./RenderChildrenWindow";
export default function Kernel({children,applicationId,windowId,INSTALLED_APPLICATIONS,...props}){
    const {
        // passed via windowsStore
        message,
    } = props;
    

    return (<>
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
                {`os ${message}`}
            </div>
            {/* <div style={{borderTop:"20px solid black"}}/>
            <div>
                {StorePrinter({state: applications.state}).map(application => {
                    return <div key={application.id}>{application.message}</div>
                })}
            </div>
            <div style={{borderTop:"20px solid black"}}/>
            <div>
                {StorePrinter({state: windows.state}).map(window => {
                    return <div key={window.id}>{window.message}</div>
                })}
            </div> */}
        </div>
        <div
            style={{
                position: "fixed",
                width: "100%",
                height: "100%"
            }}
        >
            <RenderChildrenWindows id={windowId} INSTALLED_APPLICATIONS={INSTALLED_APPLICATIONS} WindowComponent={DefaultWindowComponent}/>
        </div>
        
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