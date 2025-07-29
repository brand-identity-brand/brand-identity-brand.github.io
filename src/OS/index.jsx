import { WindowManagerRenderer } from "./drivers/WindowManagerRenderer"
import ApplicationManagerRenderer from "./drivers/ApplicationManagerRenderer"

export default function OS({INSTALLED_APPLICATIONS, ROOT_WINDOW_ID}){
    return (
        <WindowManagerRenderer id={"OS"} // ROOT_WINDOW_ID={ROOT_WINDOW_ID}
            renderApplication={({applicationId})=>{
                return (
                        <ApplicationManagerRenderer id={applicationId} 
                            INSTALLED_APPLICATIONS={INSTALLED_APPLICATIONS}
                        />
                    )
                }
            }
        />
    )
}