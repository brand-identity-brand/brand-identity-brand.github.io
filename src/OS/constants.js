import Inventory from "../applications/Inventory";


import INSTALLED_APPLICATIONS from "../applications/registry";
import Window from "./drivers/Window";

// * OS const
export const ROOT_WINDOW_ID = "OS";
export const DEFAULT_WINDOW_COMPONENT = Window;
export const ROOT_APPLICATIONS = {
    [ROOT_WINDOW_ID]: {
        Component: "Inventory",// function OS({text}){ return <div>{text}</div>}, // this should points to applicationStore registry 
        props: {
            text:"Unaware OS" ,
        },
    },
    "Fake 1": {
        Component: "Inventory",// function OS({text}){ return <div>{text}</div>}, // this should points to applicationStore registry 
        props: {
            title: "Fake 1" ,

        },
    },
    "Fake 2": {
        Component: "Inventory",// function OS({text}){ return <div>{text}</div>}, // this should points to applicationStore registry 
        props: {
            text: "Fake 2" 
        },
    }
}

export const ROOT_WINDOWS = {
    [ROOT_WINDOW_ID]: {
        application: ROOT_WINDOW_ID,
        props: {
            title: ROOT_WINDOW_ID 
        },
        children: {
            active: ["Fake 1", "Fake 2", "Fake 3", "Fake 4"], // all children window ids
            hidden: ["Fake 2", "Fake 4"] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "Fake 1": {
        application: "Fake 1",
        props: {
            title: "Fake 1" ,
            initialPosition: { x: 5, y: 5 },
            initialSize: { width: 500, height: 400 },
            // ! these 3 controllers are passed by Window Driver
            // onClose = () =>{},
            // onMinimise = () =>{},
            // onFocus = () =>{},
            windowStyle: "classic", //collapse
            disableClose: false,
            disableMaximize: false,
            disableMinimize: false,
            disableResize: false,
            disableMove: false,
            // isActive = true,
            isMinimized: false,
            // parentId = null,
        },
        children: {
            active: ["Fake 2", "Fake 4"], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "Fake 2": {
        application: "Fake 2",
        props: {
            title: "Fake 2" 
        },
        children: {
            active: ["Fake 3"], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "Fake 3": {
        application: "Fake 2",
        props: {
            title: "Fake 3 ( Fake 2 )" 
        },
        children: {
            active: [], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "Fake 4": {
        application: "Fake 2",
        props: {
            title: "Fake 4 ( Fake 2 )" 
        },
        children: {
            active: [], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    }
}

export default function getOSConstants(CONSTANTS){
    const SESSION_APPLICATIONS = localStorage.getItem("APPLICATIONS") ?? ROOT_APPLICATIONS;
    const SESSION_WINDOWS = localStorage.getItem("WINDOWS") ??ROOT_WINDOWS;

    return {
        INSTALLED_APPLICATIONS,
        ROOT_WINDOW_ID,
        APPLICATIONS: SESSION_APPLICATIONS,
        WINDOWS: SESSION_WINDOWS,
        ...CONSTANTS
    }
}