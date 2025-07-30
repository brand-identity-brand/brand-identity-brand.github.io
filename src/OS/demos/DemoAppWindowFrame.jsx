import AppWindowFrame, { generateConfig }  from "../drivers/AppWindowFrame";
import { AppWindow } from "lucide-react";
import { useAppsHooks } from "../kernel/useApplicationsStore";
import { useWindowsHooks } from "../kernel/useWindowsStore";
import useKernelContext from "../kernel/useKernelContext";
import initAppIntoWindow, { useInitAppIntoWindowHook } from "../events/initAppIntoWindow";
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

DemoAppWindowFrame.Icon = ({windowId}) => {
    const ctx = useInitAppIntoWindowHook();

    const onClickHandler = initAppIntoWindow({
        ctx,
        appName: "DemoAppWindowFrame",
        mode: "multi",
        windowId,
        application: {
            Component: "DemoAppWindowFrame",
            props: {
                message:"GUI rendered" ,
            },
        },
        window: {
            props:{
                title:"12"
            },
            children: {
                active: [],
                hidden: [] 
            }
        }
    });

    return <AppWindow onClick={onClickHandler}/>
}