import AppWindowFrame, { generateConfig }  from "../drivers/AppWindowFrame";
import { AppWindow } from "lucide-react";
import { useAppsHooks } from "../kernel/useApplicationsStore";
import { useWindowsHooks } from "../kernel/useWindowsStore";
import useKernelContext from "../kernel/useKernelContext";

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
    const { hooks: { windows, apps } } = useKernelContext();
    const  { useApplicationsContoller } = apps;
    const {
        registerApplication,
    } = useApplicationsContoller()
    const { useWindowsContollers } = windows;
    const {
        registerWindow,
        registerChildWindow
    } = useWindowsContollers()

    const onClickHandler = () => {
        // TODO: logic for generateing apps id and windows id
        // ! pre-req: the installed application needs to be "INSTALLED" 
        // * this registers the application inside appsStore
        const applicationId = "DemoAppWindowFrame GENERATED";
        registerApplication({
            id: applicationId,
            application: {
                Component: "DemoAppWindowFrame",
                props: {
                    message:"GUI rendered" ,
                },
            }
        })
        // * this registers the window inside windowsStore
        // * the window's applicaitonId is based on previous step
        registerWindow({
            id: applicationId,
            window:{
                applicationId: applicationId,
                props:{
                    title: applicationId
                },
                children: {
                    active: [],
                    hidden: [] 
                }
            }
        })
        // * this registers the newley create window as a children.active in designated window
        registerChildWindow({id: windowId, childId: applicationId})
    }

    return <AppWindow onClick={onClickHandler}/>
}