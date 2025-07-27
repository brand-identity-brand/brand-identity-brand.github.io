import { createContext, useRef, useEffect, useState } from "react";


export const WindowManagerRegistryContext = createContext(null);
WindowManagerRegistryContext.displayName = 'WindowManagerRegistryContext';

/**
 * Provider component for window manager registry
 * @param {WindowManagerRegistryProviderProps} props
 */
const example_windows = {
    "OS": {
        window: {
            props: {

            },
            windows: {
                active: [], // all children window ids
                hidden: [] // must be from active list. these window will be pushed to the back (z-index). this preserves react useState for teh current session
            },
        },
        application: {
            Component: function OS({text}){ return <div>{text}</div>}, // this should points to applicationStore registry 
            props: {
                text:"Unaware OS" 
            },
        }
    }
}
export function WindowManagerRegistryProvider({ children, sessionWindows={} }) {
  const value = useWindowManagerRegistry(sessionWindows);
  return (
    <WindowManagerRegistryContext.Provider value={value}>
      {children}
    </WindowManagerRegistryContext.Provider>
  );
}

/**
 * Hook to manage window registry state
 * @param {WindowSpecsMap} [windowSpecsFromLastSession] - Window specs from previous session
 * @returns {WindowManagerRegistryValue}
 */
export default function useWindowManagerRegistry(sessionWindows) {
  const windowSpecsRef = useRef(sessionWindows);

  /**
   * Check if a window exists
   * @param {string} targetWindowId - ID of window to check
   * @returns {boolean}
   */
  function doesTargetWindowIdExist(targetWindowId) {
    return windowSpecsRef.current.hasOwnProperty(targetWindowId);
  }

  /**
   * Get window specs by ID
   * @param {string} targetWindowId - ID of window to get
   * @param {boolean} [deepCopy=false] - Whether to return a deep copy
   * @returns {WindowSpecs}
   */
  function getTargetWindowSpecsById(targetWindowId, deepCopy = false) {
    return windowSpecsRef.current[targetWindowId];
  }

  /**
   * Update window specs by ID
   * @param {string} targetWindowId - ID of window to update
   * @param {Partial<WindowSpecs>} anObjectOfSpecsToUpdate - Specs to update
   */
  function setTargetWindowSpecsById(targetWindowId, anObjectOfSpecsToUpdate) {
    windowSpecsRef.current[targetWindowId] = {
      ...windowSpecsRef.current[targetWindowId],
      ...anObjectOfSpecsToUpdate
    };
    console.log(windowSpecsRef.current)
  }

  /** @type {WindowSpecs} */
  const defaultWindowSpecs = {
    Component: '',
    props: {},
    states: {},
    windows: { active: [], hidden: [], closed: [] },
    registeredIn: []
  };

  function registerWindow({windowId,...rest }){
    windowSpecsRef.current[windowId] = {...rest};
  }
  return {
    windowSpecsRef,
    registerWindow,
    doesTargetWindowIdExist,
    getTargetWindowSpecsById,
    setTargetWindowSpecsById,
  };
} 