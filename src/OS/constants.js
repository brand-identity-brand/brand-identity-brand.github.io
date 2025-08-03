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
}
const DEMO_APPS = {
    "MemoryStick": {
        Component: "Demo",
        props: {
            message: "id: MemoryStick, App: Demp",
            children: ["MemoryStick Demo div"]
        }
    },
    "DemoAppWindowFrame": {
        Component: "DemoAppWindowFrame",
        props: {
            message:"running DemoAppWindowFrame",
        },
    },
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
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
}
const DEMO_WINDOWS = {
    "GUI": {
        applicationId: "GUI",
        props: {},
        children: {
            active: ["WIND1"], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "WIND1": {
        applicationId: "DemoAppWindowFrame",
        props: {title: "DemoAppWindowFrame" },
        children: {
            active: [],
            hidden: []
        },
    },
}
import { createWindowsStore } from "./kernel/useWindowsStore";
import { createAppsStore } from "./kernel/useApplicationsStore";
export const windowsStore = createWindowsStore({}); 
export const appsStore = createAppsStore({});

export const STORE = {
    WINDOWS: {
        default: createWindowsStore({
            ...ROOT_WINDOWS
        }),
        demo: createWindowsStore({
            ...ROOT_WINDOWS,
            ...DEMO_WINDOWS
        }),
    },
    APPS: {
        default: createAppsStore({
            ...ROOT_APPS,
            
        }),
        demo: createAppsStore({
            ...ROOT_APPS,
            ...DEMO_APPS
        }),
    }
}

// * INSTALLED_APPLICATIONS
import Kernel from "./drivers/Kernel";
import GUI from "./drivers/GUI";
import Demo from "./demos/Demo";
import DemoAppWindowFrame from "./demos/AppWindowFrame";

export const APPLICATIONS = {
    default: { // ! INSTALLED_APPS {key:value} provided by < OS/>
        "Kernel": Kernel,
        "GUI": GUI,
    },
    demos: {
        "Demo": Demo,
        "DemoAppWindowFrame": DemoAppWindowFrame,
    }
}