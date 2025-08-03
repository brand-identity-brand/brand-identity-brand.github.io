export const ROOT_APPS = {
    "Kernel":{
        Component: "Kernel",
        props: {
            message: "Kernel loaded"
        }
    },
    "GUI": {
        Component: "GUI",
        props: {
            message:"GUI rendered" ,
        },
    },
    // "MemoryStick": {
    //     Component: "Demo",
    //     props: {
    //         message: "id: MemoryStick, App: Demp",
    //         children: ["MemoryStick Demo div"]
    //     }
    // },
    // "DemoAppWindowFrame": {
    //     Component: "DemoAppWindowFrame",
    //     props: {
    //         message:"running DemoAppWindowFrame",
    //     },
    // },
}
export const ROOT_WINDOWS = {
    "Kernel":{
        applicationId: "Kernel",
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
            active: [],
            // active: ["WIND1"], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    // "WIND1": {
    //     applicationId: "DemoAppWindowFrame",
    //     props: {title: "DemoAppWindowFrame" ,},
    //     children: {
    //         active: [],
    //         hidden: []
    //     },
    // },
}
import { createWindowsStore } from "./kernel/useWindowsStore";
import { createAppsStore } from "./kernel/useApplicationsStore";
export const windowsStore = createWindowsStore({}); 
export const appsStore = createAppsStore({});

export const STORE = {
    WINDOWS: {
        default: windowsStore,
        demo: { /** TDOO */}
    },
    APPS: {
        default: appsStore,
        demo: { /** TDOO */}
    }
}

import Kernel from "./drivers/Kernel";
import GUI from "./drivers/GUI";
import Demo from "./demos/Demo";
import DemoAppWindowFrame from "./demos/AppWindowFrame";

export const APPLICATIONS = {
    os: { // ! INSTALLED_APPS {key:value} provided by < OS/>
        "Kernel": Kernel,
        "GUI": GUI,
        // "MemoryStick": {
        //     Component: "Demo",
        //     props: {
        //         message: "id: MemoryStick, App: Demp",
        //         children: ["MemoryStick Demo div"]
        //     }
        // },
        // "DemoAppWindowFrame": {
        //     Component: "DemoAppWindowFrame",
        //     props: {
        //         message:"running DemoAppWindowFrame",
        //     },
        // },
    },
    demos: {
        "Demo": Demo,
        "DemoAppWindowFrame": DemoAppWindowFrame,
    }
}