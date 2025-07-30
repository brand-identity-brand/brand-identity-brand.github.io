// * OS constants
import { DEMO_APPS } from "./constants";
// * main
import { KernelProvider } from "./drivers/KernelProvider"
import ApplicationManagerRenderer from "./drivers/ApplicationManagerRenderer"
// * internal applications
import Kernel from "./drivers/Kernel";
import GUI from "./drivers/GUI";

export default function OS({INSTALLED_APPLICATIONS, demo, windowsStore, appsStore}){
    
    const applicationRegistry = {
        Kernel,
        GUI,
        ...(demo ? DEMO_APPS : {}),
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