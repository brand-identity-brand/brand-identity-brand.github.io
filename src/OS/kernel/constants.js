import Inventory from "../../applications/Inventory";


import INSTALLED_APPLICATIONS from "../../applications/registry";
import Window from "../drivers/Window";

// * OS const
export const ROOT_WINDOW_ID = "OS";
export const DEFAULT_WINDOW_COMPONENT = Window;
export const ROOT_APPLICATIONS = {
    [ROOT_WINDOW_ID]: {
        Component: "Inventory",// function OS({text}){ return <div>{text}</div>}, // this should points to applicationStore registry 
        props: {
            text:"Unaware OS" 
        },
    },
    "Fake 1": {
        Component: "Inventory",// function OS({text}){ return <div>{text}</div>}, // this should points to applicationStore registry 
        props: {
            text: "Fake 1" 
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
        props: {

        },
        children: {
            active: ["Fake 1", "Fake 2"], // all children window ids
            hidden: ["Fake 2"] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "Fake 1": {
        props: {

        },
        children: {
            active: ["Fake 2"], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "Fake 2": {
        props: {

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