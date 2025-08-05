// essentials 
export { default as OS } from "./src/OS";

export { createAppsStore, useAppsHooks } from "./src/OS/kernel/useApplicationsStore";
export { createWindowsStore, useWindowsHooks } from "./src/OS/kernel/useWindowsStore";
// * ui 
export { default as AppWindowFrame } from "./src/OS/drivers/AppWindowFrame";
export { default as DropdownMenu } from "./src/OS/drivers/DropdownMenu";
export { default as TabSystem } from "./src/OS/drivers/TabSystem";
export { default as Window } from "./src/OS/drivers/Window";
// * ui tools
export { default as ChildrenWindowsControllerRenderer } from "./src/OS/drivers/AppWindowFrame/ChildrenWindowsControllerRenderer";
export { default as ChildrenWindowsRenderer } from "./src/OS/drivers/ChildrenWindowsRenderer";
export { default as ApplicationManagerRenderer } from "./src/OS/drivers/ApplicationManagerRenderer";
