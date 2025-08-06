import AppWindowFrame from ".";
import ChildrenWindowsRenderer from "../ChildrenWindowsRenderer";
import ChildrenWindowsControllerRenderer from "./ChildrenWindowsControllerRenderer";

export function AppMenu( {children}){
    return (
        <AppWindowFrame.Top>
            {children}
        </AppWindowFrame.Top>
    )
}
export function ContentArea( {children, style, ...props}){
    const {
        windowId
    } = props;
    return (
        <AppWindowFrame.Mid style={style}>
            <div 
                style={{
                    backgroundColor:"white", 
                    width:"100%", 
                    height:"100%", 
                    top: 0, left: 0, 
                    position:"absolute"
                }}
            >
            {/* <TabSystem.Panel id={"Cpu"}> */}
                {/* <TabSystem.Panel id={{appName:"Kernel"}} > */}
                    {/*
                        * // ! the id must exist in applicationsStore for this Panel to render
                        */}
                    {/* <ApplicationManagerRenderer id={"Kernel"} windowId={windowId}/> */}
                {/* </TabSystem.Panel> */}
                {/* <TabSystem.Panel id={{appName:"Demo"}}> */}
                    {/* Demo */}
                {/* </TabSystem.Panel> */}

            {/* </TabSystem.Panel> */}
            </div>
                {children}
            <ChildrenWindowsRenderer id={windowId}/>
        </AppWindowFrame.Mid>
    )
}
export function TaskBar({children,...props}){// ! Bot
    const { 
        // * 0 left most
        StartIconJSX = <div>?</div>,
        // * 1 second from the left
        // applets buuttons in 
        // children, 
        // * 2 third from the left - give windowId and filter with applicationIds to render childrenId
        windowId, 
        applicationIds,//! white list applicationIds
        ...otherProps
    } = props;
    return (
        <AppWindowFrame.Bot {...otherProps}>

            <Start>
                {StartIconJSX}
            </Start>

            <AppWindowFrame.Bot.Border width="4px"/>

            { children && <>
                <AppTabs> 
                    {children}
                </AppTabs>
                <AppWindowFrame.Bot.Border width="4px"/>
            </>}

            <ChildrenWindowsTogglers windowId={windowId} applicationIds={applicationIds}/>
        </AppWindowFrame.Bot> 
    )
}
function Start({children}){
    return (
        <AppWindowFrame.Bot.Square padding="0px">
            {children}
        </AppWindowFrame.Bot.Square>
    )
}
function AppTabs({children}){
    return (
        <AppWindowFrame.Bot.FillRect paddingLR="0px">
            {children}
        </AppWindowFrame.Bot.FillRect>
    )
}
function ChildrenWindowsTogglers({windowId, applicationIds}){
    return (
        <AppWindowFrame.Bot.FillRect>
            <ChildrenWindowsControllerRenderer id={windowId}  applicationIds={applicationIds}/>
        </AppWindowFrame.Bot.FillRect>
    )
}
// * ==usages
TaskBar.Empty = function EmptyTaskBar(){
    return (
        <AppWindowFrame.Bot>
            <AppWindowFrame.Bot.Square/>
            <AppWindowFrame.Bot.Border width="4px"/>
        </AppWindowFrame.Bot> 
    )
}
