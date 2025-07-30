
import Window from "./Window";
import HiddenWindows from "./HiddenWindows";
import ApplicationManagerRenderer from "./ApplicationManagerRenderer";
import useKernelContext from "../kernel/useKernelContext";

export default function RenderChildrenWindows({id, WindowComponent=Window}){
    const kernel = useKernelContext();
    const { useWindowContollers, useWindowState } = kernel.hooks.windows

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
    WindowComponent
}){
    const kernel = useKernelContext();
    const { useWindowState } = kernel.hooks.windows
    //TODO: move childId !== "GUI" into a function that gets the referencial value "GUI" from context
    const windowControllerProps = childId !== "GUI" ? {
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
    }:{};

    const  { applicationId, props: windowProps}  = useWindowState({id: childId });

    const isWindowHidden = hidden.includes(childId);
    const generatedProps = {
        zIndex: isWindowHidden ? "-1" : "1"
    };
    const Component = WindowComponent

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
            />
        </Component>
    )
}