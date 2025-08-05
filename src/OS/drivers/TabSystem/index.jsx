import { useContext, useState, createContext  } from "react";
import css from "./index.module.css"
// import { Backpack } from "lucide-react";

// this thign supports multi dimentional tabs 

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
    // ! only checks the first value
    // ! this makes the order of this object matter
    // TODO: make this an array
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

    const { active, inactive, ..._style } = style?? {};

    return (
        <Component
            className={
                css.unselectableText
            }
            style={{
                ...( isActive(_id, activeTabId) ? {
                    // * default css - active
                    backgroundColor: "rgba(0, 72, 255, 0.47)", /* Your desired blue color */
                    // background:"transparent",
                    color: "white",
                    width:"100%",
                    height:"100%",
                    fontFamily:"serif",
                    ...active || {}
                }:{
                    // * default css - inactive
                    background:"transparent",
                    // backgroundColor: "white",
                    // color: "black",
                    width:"100%",
                    height:"100%",
                    fontFamily:"sans-serif",
                    ...inactive ?? {}
                }),
                // overflow:"clip",
                ..._style
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
                background:"transparent",
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