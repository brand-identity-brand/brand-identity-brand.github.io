import { useWindowState, useWindowContollers } from "../kernel/useWindowsStore";

export function WindowManager({style, children, ...props}){
    const {
        id,
        WindowComponent = DefaultWindowComponent,
        HiddenWindowComponent = DefaultHiddenWindowComponent
    } = props;
    //* [Component Materials] Window  
    const windowState = useWindowState({id });
    const {
        // props: windowProps,
        children: {
            active,
            hidden
        }
    } = windowState;
    
    return (
        <div
            style= {
                {
                    width: "100%",
                    height: "100%",
                    ...style
                }
            }
        >
            {children}
            {active.map( id => {
                return (
                    <WindowComponent
                        key={id}
                    >
                        {`hydrayte this window with application[id] where id is${id}`}
                        <WindowManager id={id} WindowComponent={WindowComponent}/>
                    </WindowComponent>
                )
            })}
            {hidden.map( id => {
                return (
                    <HiddenWindowComponent
                        key={id}
                    >
                        {`hidden widnow id: ${id}`}
                    </HiddenWindowComponent>
                )
            })}
        </div>
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
        <div {...props}>
            {children}
        </div>
    )
}