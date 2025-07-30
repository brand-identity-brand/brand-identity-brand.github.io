import AppWindowFrame from "./AppWindowFrame";
import { generateConfig } from "./AppWindowFrame";
import DemoAppWindowFrame from "../demos/DemoAppWindowFrame";
const config = generateConfig({
    top: { use: false },
    bot: {
        renderers: [
            {
                componentName: "Square",
                border: { right: true },
                children: <DemoAppWindowFrame.Icon />
            },
            {
                componentName: "FillRect",
                border: { right: true },
                children: []
            }
        ]
    }
})
export default function GUI({windowId, message}){
    
    return (
        <AppWindowFrame
            windowId={windowId}
            config={config}
        >
            <div>
                prop.message: {message}
            </div>
        </AppWindowFrame>
    )
}

