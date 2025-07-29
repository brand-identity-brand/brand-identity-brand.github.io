import { useWindowState } from "../kernel/useWindowsStore";
import { OS } from "../constants";

import { useWindowsStore } from "../kernel/useWindowsStore";


export function WindowManagerRenderer({style, ...props}){
    const {
        renderApplication,
        parentId = OS,
        id,
        WindowComponent = DefaultWindowComponent,
        HiddenWindowComponent = DefaultHiddenWindowComponent,
    } = props;
    //TODO zustand + tankstack query
    //* [Component Materials] Window
    // this line grabs the Container props for initial render
    // this DOES NOT inlclude window controllers that is triggered by child but managed by parent component.
    // const windowProps = useWindowsStore((s)=>s.windows[id].props);

    // const active = useWindowsStore((s)=>s.windows[id].children.active);
    // const hidden = useWindowsStore((s)=>s.windows[id].children.hidden);
    
    const liftChildWindow  = useWindowsStore((s)=>s.liftChildWindow);
    const closeChildWindow  = useWindowsStore((s)=>s.closeChildWindow);
    const hideChildWindow = useWindowsStore((s)=>s.hideChildWindow);

    const windowState = useWindowState({id });
    const {
        // dangerous:{ window },
        application,
        props: windowProps,
        children : {
            active,
            // hidden
        }
    } = windowState;

    const Container = parentId === OS
        ? DefaultWindowComponent
        : WindowComponent

    const containerProps = parentId === OS
        ? {} 
        : {
            onFocus: (e)=>{
                //* [Rule] onFocus needs to bubble up as nested child window should trigger it's parent to pop to the front
                // e.stopPropagation(); 
                liftChildWindow({id: parentId, childId: id})
            },
            onClose: (e)=>{
                //* [Rule] if propagation is not prevented, the Window will try running onFocus which will not have a valid childId args causing silent bug.
                e.stopPropagation(); 
                closeChildWindow({id: parentId, childId: id})
            },
            onMinimise: function onHide(e){
                e.stopPropagation(); 
                hideChildWindow({id: parentId, childId: id})
            }
        }
    const parentWindowState = useWindowState({id:parentId });
    const isWindowHidden = parentWindowState.children.hidden.includes(id);
    const generatedProps ={
        zIndex: isWindowHidden ? "-1" : "1"
    }
    return (
        // base Compoenet, then WindowCompeonnt
        <Container 
            {...windowProps} // * restored from windowStore
            {...containerProps} // * windowStore mutators
            {...generatedProps} // * Window Props controlled by WindowManager instead of user. It current only manages z-index 
            style= {
                {
                    width: "100%",
                    height: "100%",
                    ...style
                }
            }
        >
            {/* application renders here */}
            {"appId: " + application}
            { renderApplication({id}) }
            {active.map( childId => {
                return (
                    <WindowManagerRenderer key={childId} 
                        parentId={id} 
                        id={childId} 
                        WindowComponent={WindowComponent}
                        renderApplication={renderApplication}
                    />
                )
            })}
            {/* {hidden.map( childId => {
                return (
                    <HiddenWindowComponent
                        key={childId}
                        onClick={()=>closeChildWindow({id: id, childId: childId})}
                    >
                        {`hidden widnow id: ${childId}`}
                    </HiddenWindowComponent>
                )
            })} */}
        </Container>
    )
}


function DefaultWindowComponent({children, ...props}){
    return (
        <div {...props}>
            {children}
        </div>
    )
}

function DefaultHiddenWindowComponent({children, ...props}){
    return (
        <div {...props}
            style={{
                border: "1px solid red",
                ...props.style
            }}
        >
            {children}
        </div>
    )
}