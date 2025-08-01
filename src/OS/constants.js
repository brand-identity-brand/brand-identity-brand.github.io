import { Component } from "lucide-react"
import Demo from "./demos/Demo"
import DemoAppWindowFrame from "./demos/AppWindowFrame"

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
    "MemoryStick": {
        Component: "Demo",
        props: {
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
            active: ["WIND1"], // all children window ids
            hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
        },
    },
    "WIND1": {
        applicationId: "DemoAppWindowFrame",
        props: {title: "DemoAppWindowFrame" ,},
        children: {
            active: [],
            hidden: []
        },
    },
}
// const zIndexes = {
//     ["Kernel"]: -2,
//     GUI: 1,
// }
export const DEMO_APPS = {
    "Demo": Demo,
    "DemoAppWindowFrame": DemoAppWindowFrame,

}