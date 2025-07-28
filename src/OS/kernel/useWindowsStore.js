import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

// const window = useWindowsStore((state) => state.windows[id]);
// const registerChildWindow = useWindowStore((state)=> state.registerChildWindow);
import getOSConstants from '../constants';


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
    liftChildWindow: ({id, childId}) => {
        set((state)=>{
            const windows = state.windows;
            const window = windows[id]
            if (!window) {
                throw new Error(`Missing parent window ID "${id}" in useWindowsStore.`);
            }
            // * extract the needed slice
            const active = window.children.active;
            // * already the top window (last on the list)
            const isTheLastChildId =  active.at(-1) === childId;
            if ( isTheLastChildId ) return { };  //! must return an empty array if nothing changes
            // * re-order 
            const nextActive = [
                ...active.filter( item => {
                    if (item === childId) return false;
                    return true;
                }), 
                childId
            ];
            return {
                windows: {
                    ...windows, 
                    [id]: {
                        ...window,
                        children: {
                            ...window.children,
                            active: nextActive, 
                        }
                    },
                }
            }
        });
        return childId;
    },

    closeChildWindow: ({id, childId}) => {
        
        // * id -> parent window id
        set((state) => {
            const windows = state.windows;
            const window = windows[id];
            if (!window) {
                throw new Error(`Missing parent window ID "${id}" in useWindowsStore.`);
            }
            // * extract the needed slice
            const active = window.children.active;
            const hidden = window.children.hidden;
            const newActiveWindows = active.filter(windowId => windowId !== childId);
            
            const newHiddenWindows = hidden.filter(windowId => windowId !== childId);

            console.log({
                    active: [...newActiveWindows], 
                            hidden: [...newHiddenWindows]
                })
            // console.log(id, newActiveWindows)
            return {
                windows: {
                    ...windows, 
                    [id]: {
                        ...window,
                        children: {
                            // ...window.children,
                            active: [...newActiveWindows], 
                            hidden: newHiddenWindows
                        }
                    },
                },
            };
        });
        //TODO: some window might be headless.
        return childId;
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
    //! dif by reference. select all refrence space one by one, as that is the only way to select reference in js. 
    //! decoupling results in capturing value instead of refrence.
    // const window = useWindowsStore((s)=>s.windows[id]);
    const application = useWindowsStore((s)=>s.windows[id].application);
    const props = useWindowsStore((s)=>s.windows[id].props);
    // const children = useWindowsStore((s)=>s.windows[id].children);
    const active = useWindowsStore((s)=>s.windows[id].children.active);
    const hidden = useWindowsStore((s)=>s.windows[id].children.hidden);
    return {
        // dangerous:{ window },
        application,
        props,
        // children : {
            active,
            hidden
        // }
    };
}


// * this returns the target id window contollers
// * they are mutators for the window state.

export function useWindowContollers({id}){
    const registerWindow = useWindowsStore((s)=>s.registerWindow);
    const registerChildWindow  = useWindowsStore((s)=>s.registerChildWindow);
    const liftChildWindow  = useWindowsStore((s)=>s.liftChildWindow);
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
            liftChildWindow,
            closeChildWindow
        },
        //* official api
        registerWindow: ({id, window})=>registerWindow({id, window}),
        registerChildWindow: (childId)=>registerChildWindow({id,childId}),
        liftChildWindow: (childId)=>liftChildWindow({id,childId}),
        closeChildWindow: (childId) => closeChildWindow({id,childId}),
    }
}