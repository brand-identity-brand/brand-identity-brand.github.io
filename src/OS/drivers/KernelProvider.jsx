import { useWindowsHooks } from "../kernel/useWindowsStore";
import { useAppsHooks } from "../kernel/useApplicationsStore";
import { KernelContext } from "../kernel/useKernelContext";


export function KernelProvider({children, ...props}){
    const {
        applicationRegistry,
        windowsStore,
        appsStore
    } = props;

    const hooks = { 
        windows: useWindowsHooks(windowsStore),
        apps: useAppsHooks(appsStore)
    }

    const value = {
        applicationRegistry,
        hooks
    }

    return (
        <KernelContext.Provider value={value}>
            {children}
        </KernelContext.Provider>
    )
}

