import RenderChildrenWindows from "../OS/drivers/RenderChildrenWindow";
import AppWindowFrame from "../OS/drivers/AppWindowFrame";

// * this is the base of the OS
// * you must have "GUI"
export default function GUI({windowId}){
    return (
        <AppWindowFrame
            {...{windowId}}
        >
            <RenderChildrenWindows id={windowId}/>
        </AppWindowFrame>
    )
}

