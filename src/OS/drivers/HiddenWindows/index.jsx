
export default function HiddenWindows({...props}){
    const {
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
                backgroundColor: "white",
                height: "30px",
                display: "flex",
                flexDirection:"column",
                alignItems: "flex-start",
                justifyContent: "center"
            }}
        >
            {/* //Todo: AA get click to work. needs to mutatable windwo.children.actives */}
            {active.map( childId => {
                const isWindowHidden = hidden.includes(childId);
                const style = isWindowHidden
                    ? {
                        backgroundColor: "white"
                    }
                    : {
                        backgroundColor: "green"
                    }
                ;
                return (
                    <button key={childId}
                        style={style}
                        onClick={()=>{
                            // Click needs to remove id from hidden
                            unhideChildWindow(childId)
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