
import Window from "./Window";
import ApplicationManagerRenderer from "./ApplicationManagerRenderer";
import useKernelContext from "../kernel/useKernelContext";

// TODO: [rename]: ChildrenWindowRenderer
export default function ChildrenWindowsRenderer({id, WindowComponent=Window}){
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


    //TODO: let each window track their own layers.
    //TODO: always render from active. then when rendering child use local states. 
    //TODO: on save state that is when local state merges into active, which means rebuilding the new children array according to the current zIndex. like a race, that is their next round start position. the result of the race will be the next start
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
            // ! problem with this hook
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