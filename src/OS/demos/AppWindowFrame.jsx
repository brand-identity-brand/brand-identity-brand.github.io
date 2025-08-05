import AppWindowFrame from "../drivers/AppWindowFrame";
import { AppWindow } from "lucide-react";
import { useAppsHooks } from "../kernel/useApplicationsStore";
import { useWindowsHooks } from "../kernel/useWindowsStore";
import useKernelContext from "../kernel/useKernelContext";
import initAppIntoWindow, { useInitAppIntoWindowHook } from "../events/initAppIntoWindow";
import ChildrenWindowsControllerRenderer from "../drivers/AppWindowFrame/ChildrenWindowsControllerRenderer";
import ChildrenWindowsRenderer from "../drivers/ChildrenWindowsRenderer";

export default function DemoAppWindowFrame(props){
    const {
        windowId,
        message
    } = props;
    return (
        <AppWindowFrame
            config={{
                top: { use: true },
                bot: { use: true },
            }}
        >
            {/* <div>
                prop.message: {message}
            </div> */}
            <AppWindowFrame.Top>
                {/* <MenuBar menuItems={menuItems}/> */}
            </AppWindowFrame.Top>
            <AppWindowFrame.Mid>
              <div 
                style={{
                  backgroundColor:"white", 
                  width:"100%", 
                  height:"100%", 
                  top: 0, left: 0, 
                  position:"absolute"
                }}
              >
          
              </div>
          
              <ChildrenWindowsRenderer id={windowId}/>
            </AppWindowFrame.Mid>
            <AppWindowFrame.Bot>
                <AppWindowFrame.Bot.Square >
                    <DemoAppWindowFrame.Icon windowId={windowId} />
                </AppWindowFrame.Bot.Square>
                <AppWindowFrame.Bot.Border/>
                {/* <AppWindowFrame.Bot.FillRect>
                    <DemoAppWindowFrame.Icon windowId={windowId} />
                </AppWindowFrame.Bot.FillRect> */}
                <AppWindowFrame.Bot.FillRect>
                    {/* <DemoAppWindowFrame.Icon windowId={windowId} /> */}
                    <ChildrenWindowsControllerRenderer id={windowId} />
                </AppWindowFrame.Bot.FillRect>
            </AppWindowFrame.Bot> 
        </AppWindowFrame>
    )
}
DemoAppWindowFrame.displayName = "DemoAppWindowFrame";
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