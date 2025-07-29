import { WindowManagerRenderer } from "./drivers/WindowManagerRenderer"
import ApplicationManagerRenderer from "./drivers/ApplicationManagerRenderer"

export default function OS({INSTALLED_APPLICATIONS, ROOT_WINDOW_ID}){
    return (
        <WindowManagerRenderer id={"OS"} // ROOT_WINDOW_ID={ROOT_WINDOW_ID}
            renderApplication={({applicationId, windowId, renderChildrenWindow})=>{
                
                return (
                        <ApplicationManagerRenderer 
                            renderChildrenWindow={renderChildrenWindow}
                            id={applicationId} 
                            windowId={windowId}
                            INSTALLED_APPLICATIONS={INSTALLED_APPLICATIONS}
                        />
                    )
                }
            }
        />
    )
}