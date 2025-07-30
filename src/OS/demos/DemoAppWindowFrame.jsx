import AppWindowFrame, { generateConfig }  from "../drivers/AppWindowFrame";
import { AppWindow } from "lucide-react";

const config = generateConfig({
    top: {
        renderer: []
    },
    bot: {
        renderers: []
    }
})

export default function DemoAppWindowFrame(props){
    const {
        windowId,
        message
    } = props;

    return (
        <AppWindowFrame windowId={windowId} config={config}>
            <div>
                props.message: {message}
            </div>
        </AppWindowFrame>
    )
}

DemoAppWindowFrame.Icon = () => {
    // ! pre-req: the installed application needs to be "INSTALLED" 
    // TODO: registerApplication
    // * this registers the application inside appsStore
    // TODO: registerWindow
    // * this registers the window inside windowsStore
    // * the window's applicaitonId is based on previous step
    // TODO: registerChildWindow
    // * this registers the newley create window as a children.active in designated window
    return (
        <div>
            <AppWindow />
        </div>
    )
}