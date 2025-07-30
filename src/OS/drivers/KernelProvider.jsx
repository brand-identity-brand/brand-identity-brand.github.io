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

    const states = {
        windows: useWindowsHooks(windowsStore).useWindowsState(),
        apps: useAppsHooks(windowsStore).useApplicationsState()
    }
    const value = {
        applicationRegistry,
        hooks,
        states
    }

    return (
        <KernelContext.Provider value={value}>
            {children}
        </KernelContext.Provider>
    )
}

