import { WindowManagerRenderer } from "../OS/drivers/WindowManagerRenderer"

export default function GUI({windowId}){
    return (
        <div>
            <WindowManagerRenderer.Hidden id={windowId}/>
        </div>
    )
}