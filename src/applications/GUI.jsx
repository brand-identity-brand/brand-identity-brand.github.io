import { WindowManagerRenderer } from "../OS/drivers/WindowManagerRenderer"

export default function GUI({windowId, children}){
    return (
        <div
            style = {{
                position:"fixed",
                width:"100%",
                height:"100%",
                display: "flex",
                flexDirection:"column",
                justifyContent: "flex-end",
                backgroundColor: "rgba(255, 0, 179, 0.73)"
            }}
        >
            {children}
            <WindowManagerRenderer.Hidden id={windowId}/>
        </div>
    )
}