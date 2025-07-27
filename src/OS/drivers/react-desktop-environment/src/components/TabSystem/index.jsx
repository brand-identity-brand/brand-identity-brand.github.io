import { useState } from "react";
import css from "./index.module.css"

function useTabs( TabName ){
    const [ activeTabId, setActiveTabId] = useState(TabName);
    return [ activeTabId, setActiveTabId];
}

export const TabSystem = {
    useTabs,
    Tab,
    Panel
}

function Tab({id, title, setActiveTabId, className="", style}){
    return (
        <button 
            className={className}
            style={style}
            onClick={()=>{ 
                setActiveTabId(id)
            }}
        >
            {title? title : id}
        </button>
    )
}
function Panel({id, activeTabId, children, className="", style}){
    //? initially css.Panel is at the end
    return (
        <div 
            className={`${css.Panel} ${activeTabId === id? "" : css.hidden} ${className}`}
            style={style}
        >
            {children}
        </div>
    )
}