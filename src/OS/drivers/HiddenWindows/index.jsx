
export default function HiddenWindows({...props}){
    const {
        id,
        windows,
        active,
        hidden, // windows[id].children.hidden <Array>
        liftChildWindow,
        closeChildWindow,
        unhideChildWindow
    } = props



    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                boxSizing: "border-box",
                borderTop: "2px solid black",
                backgroundColor: "grey",
                // height: "30px",

            }}
        >
            {/* //Todo: AA get click to work. needs to mutatable windwo.children.actives */}
            {active.map( childId => {
                // const isWindowHidden = hidden.includes(childId);
                return (
                    <button key={childId}
                        style={{

                        }}
                        onClick={()=>{
                            // Click needs to remove id from hidden
                            console.log(childId)
                            unhideChildWindow({id, childId})
                            liftChildWindow(childId)
                        }}
                    >
                        {`${windows[childId].props.title}`}
                    </button>
                )
            })}
        </div>
    )
}