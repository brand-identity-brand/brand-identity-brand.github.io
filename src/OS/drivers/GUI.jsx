import AppWindowFrame from "./AppWindowFrame";
import { generateConfig } from "./AppWindowFrame";
import DemoAppWindowFrame from "../demos/DemoAppWindowFrame";
import { Cpu } from "lucide-react";
const config = (windowId) => generateConfig({
    top: { use: false },
    bot: {
        renderers: [
            {
                componentName: "Square",
                border: { right: true },
                children: <Cpu />
            },
            {
                componentName: "FillRect",
                border: { right: true },
                children: <>
                    <DemoAppWindowFrame.Icon windowId={windowId} />
                </>
            }
        ]
    }
})
export default function GUI({windowId, message}){
    console.log(windowId)
    return (
        <AppWindowFrame
            windowId={windowId}
            config={config(windowId)}
        >
            <div>
                prop.message: {message}
            </div>
        </AppWindowFrame>
    )
}

