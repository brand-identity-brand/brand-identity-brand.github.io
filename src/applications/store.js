export const APPS = {
    "OS":{
        Component: "OS",
        props: {
            message: "loaded",
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
            text:"Unaware OS" ,
        },
    },
}

export const WINDOWS = {
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
            active: ["WINDOW1"], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "WINDOW1": {
        applicationId: "Inventory",
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
            active: [], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
}