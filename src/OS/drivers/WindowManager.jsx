import { useWindowState, useWindowContollers } from "../kernel/useWindowsStore";
import { ROOT_WINDOW_ID } from "../constants";

import { useWindowsStore } from "../kernel/useWindowsStore";


export function WindowManager({style, children, ...props}){
    const {
        parentId,
        id,
        WindowComponent = DefaultWindowComponent,
        HiddenWindowComponent = DefaultHiddenWindowComponent,
        // windowControllers = {
        //     registerWindow, // {id, window }
        //     registerChildWindow, // childId
        //     liftWindow,
        //     closeWindow // childId
        // }
    } = props;

    //* [Component Materials] Window  
    // const windowState = useWindowState({id });
    const active = useWindowsStore((s)=>s.windows[id].children.active);
    const hidden = useWindowsStore((s)=>s.windows[id].children.hidden);
    const windowProps = useWindowsStore((s)=>s.windows[id].props);
    const liftChildWindow  = useWindowsStore((s)=>s.liftChildWindow);
    const closeChildWindow  = useWindowsStore((s)=>s.closeChildWindow);

    const Container = id === ROOT_WINDOW_ID
        ? DefaultWindowComponent
        : WindowComponent

    const wProps = {
        onFocus: ()=>liftChildWindow({id: parentId, childId: id}),
        onClose: ()=>closeChildWindow({id: parentId, childId: id})
    }

    return (
        // base Compoenet, then WindowCompeonnt
        <Container {...windowProps}
            {...parentId ? wProps : {}}
            style= {
                {
                    width: "100%",
                    height: "100%",
                    ...style
                }
            }
        >
            {children}
            {active.map( childId => {
                return (
                    <WindowManager key={childId} parentId={id} id={childId} WindowComponent={WindowComponent} 
                    // windowControllers={windowControllers}
                        
                    />

                    // <WindowComponent key={childId} >
                    //     {`hydrayte this window with application[id] where id is${childId}`}
                    // </WindowComponent>
                )
            })}
            {hidden.map( childId => {
                return (
                    <HiddenWindowComponent
                        key={childId}
                        onClick={()=>closeChildWindow({id: id, childId: childId})}
                    >
                        {`hidden widnow id: ${childId}`}
                    </HiddenWindowComponent>
                )
            })}
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