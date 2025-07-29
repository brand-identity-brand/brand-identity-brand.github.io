import Inventory from "../applications/Inventory";



import Window from "./drivers/Window";

// * OS const
export const OS = "OS";
export const ROOT_WINDOW_ID = "GUI";


export const ROOT_APPLICATIONS = {
    "OS":{
        Component: "OS",
        props: {
            message: "loaded"
        }
    },
    //* Applications will get "window controllers" on render. 
    //* this will be passed via the renderring sqeuwnce
    //* root -> Window[generate controllers] -> Application[accept controller from Window]
    //! thought applications can direcetly import states from useStore.js I want them to access the state via Application store instead of WindowStore.
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
    },
    "Fake 3": {
        Component: "Inventory",// function OS({text}){ return <div>{text}</div>}, // this should points to applicationStore registry 
        props: {
            text: "Fake 2" 
        },
    },
    
}

export const ROOT_WINDOWS = {
    "OS":{
        applicationId: "OS",
        props: {
        },
        children: {
            active: [ ROOT_WINDOW_ID ], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    [ROOT_WINDOW_ID]: {
        applicationId: ROOT_WINDOW_ID,
        props: {
            title: ROOT_WINDOW_ID 
        },
        children: {
            active: ["Fake 1", "Fake 2", "Fake 3"], // all children window ids
            hidden: ["Fake 2", ] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "Fake 1": {
        applicationId: "Fake 1",
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
            active: ["Fake 2", "Fake 3"], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "Fake 2": {
        applicationId: "Fake 2",
        props: {
            title: "Fake 2" 
        },
        children: {
            active: [], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "Fake 3": {
        applicationId: "Fake 3",
        props: {
            title: "Fake 3" 
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
        ROOT_WINDOW_ID,
        APPLICATIONS: SESSION_APPLICATIONS,
        WINDOWS: SESSION_WINDOWS,
        ...CONSTANTS
    }
}