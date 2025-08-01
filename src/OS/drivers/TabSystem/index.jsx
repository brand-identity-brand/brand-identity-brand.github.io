import { useContext, useState, createContext, Fragment } from "react";
import css from "./index.module.css"


const TabContext = createContext({
    useTabState: ()=>[ "state", "setState" ]
});

export default function TabSystem({children, initialActiveTabId}){
    const [ activeTabId, setActiveTabId ] = useState(initialActiveTabId);
    const value = {
        useTabState: ()=>[ activeTabId, setActiveTabId ]
    }
    return (
        <TabContext.Provider value = {value}>
            {children}
        </TabContext.Provider>
    )
}
TabSystem.Tab = function Tab({
    id, title, className="",
    children,
    style,
    Component = (props)=><div {...props}>{props.children}</div>
}){
    const { useTabState } = useContext(TabContext);
    const [ activeTabId, setActiveTabId ] = useTabState();

    return (
        <Component
            // className={className}
            style={{
                ...(activeTabId === id ? {
                    // default css - active
                    backgroundColor: "black",
                    color: "white",
                    fontFamily:"serif"
                }:{
                    // default css - inactive
                    // backgroundColor: "white",
                    // color: "black",
                    fontFamily:"sans-serif"
                }),
                // overflow:"clip",
                ...style
            }}
            onClick={()=>{ 
                setActiveTabId(id)
            }}
        >
            {children}
        </Component>
    )
}
TabSystem.Panel = function Panel({id, children, className="", style}){
    const { useTabState } = useContext(TabContext);
    const [ activeTabId, setActiveTabId ] = useTabState();
    //? initially css.Panel is at the end
    return (
        <div 
            className={`${css.Panel} ${activeTabId === id? "" : css.hidden} ${className}`}
            style={{
                // overflow:"clip",
                ...style
            }}
        >
            {children}
        </div>
    )
}

// TabSystem.Effects = function SideEffects(){


//     return (
//         <>
//         </>
//     )
// }