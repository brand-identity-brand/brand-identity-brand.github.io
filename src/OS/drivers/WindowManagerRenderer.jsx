import { useWindowState } from "../kernel/useWindowsStore";
import { OS } from "../constants";
import Window from "./Window";
import { useWindowsStore, useWindowContollers } from "../kernel/useWindowsStore";
import HiddenWindows from "./HiddenWindows";
import ApplicationManagerRenderer from "./ApplicationManagerRenderer";

function DefaultWindowComponent({children, zIndex, style, ...props}){
    return (
        <div {...props}
            style={{
                ...style,
                // zIndex:zIndex
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
    const generatedProps = {
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
            { renderApplication({
                applicationId: applicationId, 
                windowId: id,
                renderChildrenWindow: () => active.map( childId => {
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
                })
            
            }) }
            {/* application renders here */}

        </Container>
    )
}
function RenderHiddenWindows({id}){
    const { windows, children: { active, hidden } } = useWindowState({id});
    const {
        liftChildWindow,
        closeChildWindow,
        unhideChildWindow
    } = useWindowContollers({id});
    return (
        <HiddenWindows 
            active={active} 
            hidden={hidden} 
            windows={windows}
            {...{
                liftChildWindow,
                closeChildWindow,
                unhideChildWindow
            }}
        />
    )
}
WindowManagerRenderer.Hidden = RenderHiddenWindows;

export function RenderChildrenWindows({id, INSTALLED_APPLICATIONS, WindowComponent=Window}){

    const {
        liftChildWindow,
        closeChildWindow,
        hideChildWindow,
        // unhideChildWindow
    } = useWindowContollers({id});

    const {
        children : {
            active,
            hidden
        }
    }  = useWindowState({id });



    return (<>
        {active.map( childId => {
            return (
                <RenderWindow key={childId} 
                    {...{
                        liftChildWindow,
                        closeChildWindow,
                        hideChildWindow,
                        hidden,
                        childId,
                        INSTALLED_APPLICATIONS,
                        WindowComponent
                    }}
                />
            )
        })}
    </>)
}
function RenderWindow({
    liftChildWindow,
    closeChildWindow,
    hideChildWindow,
    hidden,
    childId,
    INSTALLED_APPLICATIONS,
    WindowComponent
}){
    const windowControllerProps = {
        onFocus: (e)=>{
            //* [Rule] onFocus needs to bubble up as nested child window should trigger it's parent to pop to the front
            // e.stopPropagation(); 
            liftChildWindow( childId )
        },
        onClose: (e)=>{
            //* [Rule] if propagation is not prevented, the Window will try running onFocus which will not have a valid childId args causing silent bug.
            e.stopPropagation(); 
            closeChildWindow( childId )
        },
        onMinimise: function onHide(e){
            e.stopPropagation(); 
            hideChildWindow( childId )
        }
    };

    const  { applicationId, props: windowProps}  = useWindowState({id: childId });

    const isWindowHidden = hidden.includes(childId);
    const generatedProps = {
        zIndex: isWindowHidden ? "-1" : "1"
    }
    const Component = WindowComponent
        // console.log(childId,INSTALLED_APPLICATIONS)
    return (
        <Component 
            {...windowProps} // * restored from windowStore
            {...windowControllerProps}
            {...generatedProps}
            // parentId={id} 
            // id={childId} 
        >
            <ApplicationManagerRenderer
                id ={applicationId}
                windowId ={childId}
                INSTALLED_APPLICATIONS ={INSTALLED_APPLICATIONS}
            />
        </Component>
    )
}