import { createContext } from "react";
import { useWindowsHooks } from "./useWindowsStore";
import { useAppsHooks } from "./useApplicationsStore";

export const KernelContext = createContext(null);

export function KernelProvider({children, ...props}){
    const {
        INSTALLED_APPLICATIONS,
        windowsStore,
        appsStore
    } = props;

    const hooks = { 
        windows: useWindowsHooks(windowsStore),
        apps: useAppsHooks(appsStore)
    }

    const value = {
        INSTALLED_APPLICATIONS,
        hooks
    }

    return (
        <KernelContext.Provider value={value}>
            {children}
        </KernelContext.Provider>
    )
}

