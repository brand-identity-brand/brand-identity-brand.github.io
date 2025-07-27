export { 
    default as useWindowManager,
    WindowManagerContext
} from "./components/WindowManager";
export { 
    default as useWindowManagerRegistry,
    WindowManagerRegistryContext,
    WindowManagerRegistryProvider
} from "./components/WindowManagerRegistry";

/**
 * maybe use the kernel, driver, event pattern
 * kernel = states. stores // useWindowManager -> current window state, current window state setter. 
 * driver = ui //Window.jsx component inside react-desktop-environment
 * event = fetches. data mutation. // these are the setters from windowStore
 */