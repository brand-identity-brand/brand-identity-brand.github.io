import { useOsState as useApplicationsState } from "../kernel/useApplicationsStore";
import { useOsState as useWindowsState } from "../kernel/useWindowsStore";
 import { APPS, WINDOWS } from "../../applications/store";
import { useEffect } from "react";
export default function Kernel({children,...props}){
    const {
        // passed via windowsStore
        message,
    } = props;
    
    const applications = useApplicationsState();
    const windows = useWindowsState();
 
    useEffect(()=>{
        applications.setInitialState(APPS);
        windows.setInitialState(WINDOWS);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div 
            style={{
                position: "fixed",
                top: 0,
                left: 0
            }}
        >
            <div>
                {`os ${message}`}
            </div>
            <div style={{borderTop:"20px solid black"}}/>
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
            </div>
            <div>
                {children}
            </div>
        </div>
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