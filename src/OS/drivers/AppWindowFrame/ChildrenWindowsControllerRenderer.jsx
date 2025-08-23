import useKernelContext from "../../kernel/useKernelContext";

function isJsonParsable(str) {
  if (typeof str !== 'string') return false;
  try { JSON.parse(str); return true; } catch { return false; }
}

function matcher({targetId, applicationIds=[]}){
    // matchs targetId against [ ...applicationsIds ]
    const result = applicationIds.filter( applicationId =>{
        // * case 1:  "appName" - string
        // * case 2: "[appName]" - JSON.parse( )
        // * case 2: "[appName, 0]" - JSON.parse( )
        if ( isJsonParsable(targetId) ){
            return applicationId === JSON.parse(targetId)[0];
        } else {
            return applicationId === targetId;
        }
        
    }).length === 1;
    return result;
}
export default function ChildrenWindowsControllerRenderer({id, applicationIds=undefined, Component=Button}){
    const kernel = useKernelContext();
    const { useWindowContollers, useWindowState } = kernel.hooks.windows
    
    const { windows, children: { active, hidden } } = useWindowState({id});
    const {
        liftChildWindow,
        // closeChildWindow,
        unhideChildWindow
    } = useWindowContollers({id});

    const _hidden = applicationIds === undefined
        ? hidden
        : hidden.filter((childId)=>{
            const targetId = windows[childId].applicationId;
            return matcher({targetId, applicationIds})
        });
    const _active = applicationIds === undefined
        ? active
        : active.filter((childId)=>{
            const targetId = windows[childId].applicationId;
            return matcher({targetId, applicationIds})
        });
    return (
        <>
            {/* //Todo: AA get click to work. needs to mutatable windwo.children.actives */}
            {_hidden.map( childId => {
                const style = {
                    backgroundColor: "white",
                    borderColor:"black"
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
            {_active.map( childId => {
                const isWindowHidden = hidden.includes(childId);
                if ( isWindowHidden ) return;
                const style = {
                    backgroundColor: "black",
                    borderColor:"rgb(135, 169, 255)",
                    color:"white"
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