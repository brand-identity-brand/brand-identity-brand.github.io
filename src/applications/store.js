import { createAppsStore } from "../OS/kernel/useApplicationsStore";
import { createWindowsStore } from "../OS/kernel/useWindowsStore"



export const APPS = {
    "Kernel":{
        Component: "Kernel",
        props: {
            message: "loaded",
        }
    },
    "GUI": {
        Component: "GUI",// function OS({text}){ return <div>{text}</div>}, // this should points to applicationStore registry 
        props: {
            text:"should now show"
        },
    },
    "AppWindowFrame": {
        Component: "AppWindowFrame",// function OS({text}){ return <div>{text}</div>}, // this should points to applicationStore registry 
        props: {
        },
    },
    "Inventory": {
        Component: "Inventory",// function OS({text}){ return <div>{text}</div>}, // this should points to applicationStore registry 
        props: {
            text:"Unaware OS Inventory" ,
        },
    },
}

const WINDOWS = {
    "Kernel":{
        applicationId: "Kernel",
        props: {
            title: "Kernel"
        },
        children: {
            active: ["GUI"], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "GUI": {
        applicationId: "GUI",
        props: {
            title:"GUI"
        },
        children: {
            active: ["WINDOW1", "AppWindowFrame"], // all children window ids
            hidden: ["WINDOW1", "AppWindowFrame"] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "WINDOW1": {
        applicationId: "Inventory",
        props: {
            title: "WINDOW 1" ,
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
            active: [], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "AppWindowFrame": {
        applicationId: "AppWindowFrame",
        props: {
            title: "AppWindowFrame 1" ,
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
            active: [], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    }
}


export const windowsStore = createWindowsStore(WINDOWS);
export const appsStore = createAppsStore(APPS)