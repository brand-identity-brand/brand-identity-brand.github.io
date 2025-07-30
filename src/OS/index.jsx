import ApplicationManagerRenderer from "./drivers/ApplicationManagerRenderer"
import { KernelProvider } from "./kernel/KernelContext"


export default function OS({INSTALLED_APPLICATIONS, windowsStore, appsStore}){
    return (
        <KernelProvider
            INSTALLED_APPLICATIONS={INSTALLED_APPLICATIONS}
            windowsStore={windowsStore}
            appsStore={appsStore}
        >
            <ApplicationManagerRenderer 
                id={"Kernel"}
                windowId={"Kernel"}
                // INSTALLED_APPLICATIONS={INSTALLED_APPLICATIONS}
            />
        </KernelProvider>

    )
}