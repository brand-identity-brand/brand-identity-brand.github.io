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
                borderTop: "1px solid black"
            }}
        >
            {hidden.map( childId => {
                return (
                    <div
                        key={childId}
                        onClick={()=>{}}
                    >
                        {`hidden widnow id: ${childId}`}
                    </div>
                )
            })}
        </div>
    )
}