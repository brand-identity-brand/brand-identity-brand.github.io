import useKernelContext from "../../kernel/useKernelContext";

export default function ChildrenWindowsControllerRenderer({id, Component=Button}){
    const kernel = useKernelContext();
    const { useWindowContollers, useWindowState } = kernel.hooks.windows
    
    const { windows, children: { active, hidden } } = useWindowState({id});
    const {
        liftChildWindow,
        // closeChildWindow,
        unhideChildWindow
    } = useWindowContollers({id});

    return (
        <>
            {/* //Todo: AA get click to work. needs to mutatable windwo.children.actives */}
            {hidden.map( childId => {
                const style = {
                    backgroundColor: "white"
                };
                return (
                    <Component key={childId}
                        style={style}
                        onClick={()=>{
                            // Click needs to remove id from hidden
                            unhideChildWindow(childId)
                            liftChildWindow(childId)
                        }}
                    >
                        {`${windows[childId].props.title}`}
                    </Component>
                )
            })}
            {active.map( childId => {
                const isWindowHidden = hidden.includes(childId);
                if ( isWindowHidden ) return;
                const style = {
                    backgroundColor: "green"
                };
                return (
                    <Component key={childId}
                        style={style}
                        onClick={()=>{
                            // Click needs to remove id from hidden
                            unhideChildWindow(childId)
                            liftChildWindow(childId)
                        }}
                    >
                        {`${windows[childId].props.title}`}
                    </Component>
                )
            })}
        </>
    )
}

function Button(props){
    return (
        <button {...props}>
            {props.children}
        </button>
    )
}