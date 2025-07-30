import { WindowManagerRenderer } from "./drivers/WindowManagerRenderer"
import ApplicationManagerRenderer from "./drivers/ApplicationManagerRenderer"
import { RenderChildrenWindows } from "./drivers/WindowManagerRenderer";

export default function OS({INSTALLED_APPLICATIONS}){
    return (
        <ApplicationManagerRenderer 
            id={"Kernel"}
            windowId={"Kernel"}
            INSTALLED_APPLICATIONS={INSTALLED_APPLICATIONS}
        />
    )
}