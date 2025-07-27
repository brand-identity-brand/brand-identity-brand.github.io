import { create } from 'zustand';

// const window = useWindowsStore((state) => state.windows[id]);
// const registerChildWindow = useWindowStore((state)=> state.registerChildWindow);
import getOSConstants from './constants';
const { WINDOWS } = getOSConstants();

export const useWindowsStore = create((set, get)=>({
    windows: {
        ...WINDOWS
    },
    // * on root
    registerWindow: ({id, window}) => {
        set((state) => {
            const windows = state.windows;
            if (windows[id]) {
                throw new Error(`Duplicate window ID "${id}" in useWindowsStore.`);
            }
            return {
                windows: {
                    ...windows, 
                    [id]: window,
                },
            };
        });
        return id;
    },
    // * on key
    registerChildWindow: ({id, childId})=>{
        set((state)=>{
            const windows = state.windows;
            if (!windows[id]) {
                throw new Error(`Missing parent window ID "${id}" in useWindowsStore.`);
            }
            const newActiveWindows = [ ...windows[id].children.active, childId ];
            return {
                windows: {
                    ...windows, 
                    [id]: {
                        ...windows[id],
                        children: {
                            ...windows[id].children,
                            active: newActiveWindows, 
                        }
                    },
                },
            };
        });
        return childId
    },
    closeChildWindow: ({id, childId}) => {
        // * id -> parent window id
        set((state) => {
            const windows = state.windows;
            if (!windows[id]) {
                throw new Error(`Missing parent window ID "${id}" in useWindowsStore.`);
            }
            
            const newActiveWindows = [ ...windows[id].children.active ]
                .filter(windowId => windowId !== childId);
            
            const newHiddenWindows = [ ...windows[id].children.hidden ]
                .filter(windowId => windowId !== childId);
            return {
                windows: {
                    ...windows, 
                    [id]: {
                        ...windows[id],
                        children: {
                            ...windows[id].children,
                            active: newActiveWindows, 
                            hidden: newHiddenWindows
                        }
                    },
                },
            };
        });
        //TODO: some window might be headless.
        return childId
    },
}))

// export const controllers = useWindowsStore((state) => ({
//   registerWindow: state.registerWindow,
//   registerChildWindow: state.registerChildWindow,
//   closeChildWindow: state.closeChildWindow,
// }));

// * this returns the target id window object
// * check const LIVE_WINDOWS
export function useWindowState({id}){
    return useWindowsStore((state)=>{
        const {
            windows: { 
                [id]: window 
            }
        } = state;
        return window
    })
}
// * this returns the target id window contollers
// * they are mutators for the window state.

export function useWindowContollers({id}){
    const registerWindow = useWindowsStore((s)=>s.registerWindow);
    const registerChildWindow  = useWindowsStore((s)=>s.registerChildWindow);
    const closeChildWindow  = useWindowsStore((s)=>s.closeChildWindow);
    // return {
    //     registerWindow,
    //     registerChildWindow,
    //     closeChildWindow
    // }
    return {  
        //! [Native API] too much control. only use for prototyping
        dangerous: {
            registerWindow,
            registerChildWindow,
            closeChildWindow
        },
        //* official api
        registerWindow: ({id, window})=>registerWindow({id, window}),
        registerChildWindow: (childId)=>registerChildWindow({id,childId}),
        closeChildWindow: (childId) => closeChildWindow({id,childId}),
    }
}