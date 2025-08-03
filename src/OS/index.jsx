// * OS constants
import { STORE, APPLICATIONS } from "./constants";
// * main
import { KernelProvider } from "./drivers/KernelProvider"
import ApplicationManagerRenderer from "./drivers/ApplicationManagerRenderer"
// * internal applications
// import Kernel from "./drivers/Kernel";
// import GUI from "./drivers/GUI";




export default function OS({
    mode = "default", // "demo"
    INSTALLED_APPLICATIONS = {}, 
    windowsStore = STORE.WINDOWS.default,
    appsStore = STORE.APPS.default
}){
    
    const applicationRegistry = {
        ... APPLICATIONS.os,
        ...(mode === "demo" ? APPLICATIONS.demos : {}),
        ...INSTALLED_APPLICATIONS
    };
    
    return (
        <KernelProvider
            applicationRegistry={applicationRegistry}
            windowsStore={windowsStore}
            appsStore={appsStore}
        >
            <ApplicationManagerRenderer 
                id={"Kernel"}
                windowId={"Kernel"}
            />
        </KernelProvider>

    )
}