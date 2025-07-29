import { useWindowState } from "../kernel/useWindowsStore";
import { OS } from "../constants";
import Window from "./Window";
import { useWindowsStore } from "../kernel/useWindowsStore";
import HiddenWindows from "./HiddenWindows";

function DefaultWindowComponent({children, zIndex, style, ...props}){
    return (
        <div {...props}
            style={{
                ...style,
                zIndex:zIndex
            }}
        >
            {children}
        </div>
    )
}


export function WindowManagerRenderer({style, ...props}){
    const {
        WindowComponent = Window, //DefaultWindowComponent,
        parentId = OS,
        id,
        renderApplication,
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
        applicationId,
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
    
    console.log( "RENDERED: " ,{
        id,
        applicationId,
        // WindowComponent: parentId === OS
        // parentId,
        // isWindowHidden,
        // active,
        // windowState,
        // windowProps,
        // generatedProps
    })
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
            { renderApplication({applicationId: applicationId, windowId: id}) }
            {active.map( childId => {
                // console.log("child",childId)
                return (
                    <WindowManagerRenderer key={childId} 
                        parentId={id} 
                        id={childId} 
                        WindowComponent={WindowComponent}
                        // * render function
                        renderApplication={renderApplication}
                    />
                )
            })}
        </Container>
    )
}
function RenderHiddenWindows({id}){
    const { windows, children: { hidden } } = useWindowState({id});
    return (
        <HiddenWindows hidden={hidden} windows={windows}/>
    )
}
WindowManagerRenderer.Hidden = RenderHiddenWindows;