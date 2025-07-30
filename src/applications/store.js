import { createAppsStore } from "../OS/kernel/useApplicationsStore";
import { createWindowsStore } from "../OS/kernel/useWindowsStore"



const APPS = {
    // "GUI": {
    //     Component: "GUI",
    // },
    
    // "Inventory": {
    //     Component: "Inventory",
    //     props: {
    //         text:"Unaware OS Inventory" ,
    //     },
    // },
}

const WINDOWS = {
    // "GUI": {
    //     applicationId: "GUI",
    //     props: {
    //         title:"GUI"
    //     },
    //     children: {
    //         active: [], //"WINDOW1"
    //         hidden: [] 
    //     },
    // },

    // "WINDOW1": {
    //     applicationId: "Inventory",
    //     props: {
    //         title: "WINDOW 1" ,
    //         initialPosition: { x: 5, y: 5 },
    //         initialSize: { width: 500, height: 400 },
    //         windowStyle: "classic", //collapse
    //         disableClose: false,
    //         disableMaximize: false,
    //         disableMinimize: false,
    //         disableResize: false,
    //         disableMove: false,
    //         isActive: true, //false -> window is unselectable
    //         isMinimized: false,
    //     },
    //     children: {
    //         active: [], 
    //         hidden: [] 
    //     },
    // },
}


export const windowsStore = createWindowsStore(WINDOWS);
export const appsStore = createAppsStore(APPS)