import { useContext, useState, createContext, Fragment } from "react";
import css from "./index.module.css"


const TabContext = createContext({
    useTabState: ()=>[ "state", "setState" ]
});

function generateInitialActiveTabId(initialActiveTabId){
    switch ( typeof initialActiveTabId ) {
        case "string": {
            return { default: initialActiveTabId };
        }
        case "object": {
            return initialActiveTabId;
        }
    }
}
export default function TabSystem({children, ...props}){
    const {
        initialActiveTabId // {} || string
    } = props;

    const [ activeTabId, setActiveTabId ] = useState(generateInitialActiveTabId(initialActiveTabId));
//    console.log(activeTabId)
    const value = {
        useTabState: ()=>[ activeTabId, setActiveTabId ]
    }
    return (
        <TabContext.Provider value = {value}>
            {children}
        </TabContext.Provider>
    )
}
function isActive(id, activeTabId){
    
    switch ( typeof id ) {
        case "string": {
            return activeTabId.default === id;
        }
        case "object": {
            
            const entry = Object.entries(id)[0];
            const [ key, value] = entry;

            return activeTabId[key] === value;
        }
    }
}
// ? Should I let the globalStore keep tabStates?
TabSystem.Tab = function Tab({
    id, // title, className="",
    selectActiveIds,// = [],
    children,
    style,
    Component = (props)=><div {...props}>{props.children}</div>
}){
    const { useTabState } = useContext(TabContext);
    const [ activeTabId, setActiveTabId ] = useTabState();


    const onClickHandler = () => {
        switch ( typeof id ) {
            case "string": {
                setActiveTabId((prev)=>({
                    ...prev,
                    default: id,
                    
                }));
                break;
            }
            case "object": {
                console.log({
                    ...activeTabId,
                    ...id,
                    
                });
                setActiveTabId((prev)=>({
                    ...prev,
                    ...id,
                }));
                break;
            }
        }
        
    }
    const _id = selectActiveIds === undefined
        ? id
        : selectActiveIds.reduce((accum, selectedId)=>{
            return {
                ...accum,
                [selectedId]: id[selectedId]
            }
        },{});

    return (
        <Component
            className={
                css.unselectableText
            }
            style={{
                ...( isActive(_id, activeTabId) ? {
                    // default css - active
                    backgroundColor: "blue",
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
            onClick={onClickHandler}
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
            className={`${css.Panel} ${isActive(id, activeTabId)  ? "" : css.hidden} ${className}`}
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