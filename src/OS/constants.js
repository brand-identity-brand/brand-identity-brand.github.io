// * OS const
export const OS = "OS";
export const ROOT_APPLICATIONS = {
    "OS":{
        Component: "OS",
        props: {
            message: "loaded"
        }
    },
    "GUI": {
        Component: "GUI",// function OS({text}){ return <div>{text}</div>}, // this should points to applicationStore registry 
        props: {
            text:"rendered GUI" ,
        },
    },
    "Inventory": {
        Component: "Inventory",// function OS({text}){ return <div>{text}</div>}, // this should points to applicationStore registry 
        props: {
            text:"Unaware OS Inventory" ,
        },
    },
}

export const ROOT_WINDOWS = {
    "OS":{
        applicationId: "OS",
        props: {
        },
        children: {
            active: ["GUI"], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "GUI": {
        applicationId: "GUI",
        props: {},
        children: {
            active: ["WIND1"], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "WIND1": {
        applicationId: "Inventory",
        props: {title: "Faker 1" ,},
        children: {
            active: [], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
}
const zIndexes = {
    OS: -2,
    GUI: 1,
}
export default function getOSConstants(CONSTANTS){
    const SESSION_APPLICATIONS = localStorage.getItem("APPLICATIONS") ?? ROOT_APPLICATIONS;
    const SESSION_WINDOWS = localStorage.getItem("WINDOWS") ??ROOT_WINDOWS;

    return {
        APPLICATIONS: SESSION_APPLICATIONS,
        WINDOWS: SESSION_WINDOWS,
        ...CONSTANTS
    }
}