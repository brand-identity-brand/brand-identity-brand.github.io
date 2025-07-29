export default function HiddenWindows({...props}){
    const {
        hidden // windows[id].children.hidden <Array>
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
            {hidden.map( childId => {
                return (
                    <button key={childId}
                        style={{

                        }}
                        onClick={()=>{}}
                    >
                        {`${childId}`}
                    </button>
                )
            })}
            <button>
                s
            </button>
        </div>
    )
}