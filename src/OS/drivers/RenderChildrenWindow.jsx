import { useWindowsHooks } from "../kernel/useWindowsStore";
import Window from "./Window";
// import { useWindowContollers } from "../kernel/useWindowsStore";
import HiddenWindows from "./HiddenWindows";
import ApplicationManagerRenderer from "./ApplicationManagerRenderer";
import useKernelContext from "../kernel/useKernelContext";

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


// function RenderHiddenWindows({id}){
//     const { windows, children: { active, hidden } } = useWindowState({id});
//     const {
//         liftChildWindow,
//         closeChildWindow,
//         unhideChildWindow
//     } = useWindowContollers({id});
//     return (
//         <HiddenWindows 
//             active={active} 
//             hidden={hidden} 
//             windows={windows}
//             {...{
//                 liftChildWindow,
//                 closeChildWindow,
//                 unhideChildWindow
//             }}
//         />
//     )
// }


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
            />
        </Component>
    )
}