// essentials 
export { default as OS } from "./src/OS";

export { createAppsStore, useAppsHooks } from "./src/OS/kernel/useApplicationsStore";
export { createWindowsStore, useWindowsHooks } from "./src/OS/kernel/useWindowsStore";
// * ui
export { default as AppWindowFrame } from "./src/OS/drivers/AppWindowFrame";
// * ui tools
// import ChildrenWindowsControllerRenderer from "./OS/drivers/AppWindowFrame/ChildrenWindowsControllerRenderer";
// import ChildrenWindowsRenderer from "./OS/drivers/ChildrenWindowsRenderer";
export { default as ApplicationManagerRenderer }from "./src/OS/drivers/ApplicationManagerRenderer";

// export default OS;
// export default OS;

