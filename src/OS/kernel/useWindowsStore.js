import { create } from 'zustand';
// const window = useWindowsStore((state) => state.windows[id]);
// const registerChildWindow = useWindowStore((state)=> state.registerChildWindow);
import { useCallback } from 'react';

// ! ---------new-----------
export function createWindowsStore(windows){
    return create((set, get)=>({
        windows:{ ...windows },
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

                console.log('selector run', active === newActiveWindows, hidden === newHiddenWindows)

                // console.log(id, newActiveWindows)
                //! feels like the whole object will get new referencial values. 
                //! bad feeling here. But what can i do instead of spreading out the keys
                return {
                    windows: {
                        ...windows, 
                        [id]: {
                            ...window,
                            children: {
                                // ...window.children,
                                active: newActiveWindows, 
                                //! this value gets updated. while active stays stale. 
                                //! i think the subscriber isnt detecting active when value changed. however active and hidden adpots the same procedure. so how?
                                hidden: newHiddenWindows
                            }
                        },
                    },
                };
            });
            //TODO: some window might be headless.
            return childId;
        },
        hideChildWindow: ({id, childId}) => {
            // * id -> parent window id
            set((state) => {
                const windows = state.windows;
                const window = windows[id];
                if (!window) {
                    throw new Error(`Missing parent window ID "${id}" in useWindowsStore.`);
                }
                // * extract the needed slice
                const hidden = window.children.hidden;

                return {
                    windows: {
                        ...windows, 
                        [id]: {
                            ...window,
                            children: {
                                ...window.children,
                                hidden: [ ...hidden, childId ]
                            }
                        },
                    },
                };
            });
            //TODO: some window might be headless.
            return childId;
        },
        unhideChildWindow: ({id, childId}) => {
            // * id -> parent window id
            set((state) => {
                const windows = state.windows;
                const window = windows[id];
                if (!window) {
                    throw new Error(`Missing parent window ID "${id}" in useWindowsStore.`);
                }
                // * extract the needed slice
                const hidden = window.children.hidden;

                return {
                    windows: {
                        ...windows, 
                        [id]: {
                            ...window,
                            children: {
                                ...window.children,
                                hidden: hidden.filter( id => id !== childId )
                            }
                        },
                    },
                };
            });
            //TODO: some window might be headless.
            return childId;
        }
    }))
}

export function useWindowsHooks(windowsStore){
    const useWindowsStore = windowsStore;

    return {
        useWindowsState: function useWindowsState(){
            const windows = useWindowsStore((s)=>s.windows);
            return windows;
        },
        useWindowState: function useWindowState({id}){
            const windows = useWindowsStore((s)=>s.windows);
            //! dif by reference. select all refrence space one by one, as that is the only way to select reference in js. 
            //! decoupling results in capturing value instead of refrence.
            const window = useWindowsStore((s)=>s.windows[id]);
            const applicationId = useWindowsStore((s)=>s.windows[id].applicationId);
            const props = useWindowsStore((s)=>s.windows[id].props);
            // const children = useWindowsStore((s)=>s.windows[id].children);
            const active = useWindowsStore((s)=>s.windows[id].children.active);
            const hidden = useWindowsStore((s)=>s.windows[id].children.hidden);
            return {
                windows,
                ...window,
                applicationId,
                props,
                children : {
                    active,
                    hidden
                }
            };
        },

        // * this returns the target id window contollers
        // * they are mutators for the window state.
        useWindowContollers: function useWindowContollers({id}){
            const registerWindow = useWindowsStore((s)=>s.registerWindow);
            const registerChildWindow  = useWindowsStore((s)=>s.registerChildWindow);
            const liftChildWindow  = useWindowsStore((s)=>s.liftChildWindow);
            const closeChildWindow  = useWindowsStore((s)=>s.closeChildWindow);
            const hideChildWindow = useWindowsStore((s)=>s.hideChildWindow);
            const unhideChildWindow = useWindowsStore((s)=>s.unhideChildWindow);
        // liftChildWindow: useCallback( (childId)=>liftChildWindow({id,childId}), [liftChildWindow, id]),
        // closeChildWindow: useCallback( (childId) => closeChildWindow({id,childId}) ,[closeChildWindow, id] ),
            return {
                registerWindow,
                registerChildWindow,
                liftChildWindow: useCallback((childId)=>{
                    liftChildWindow({id,childId});
                    console.log("liftChildenWindow: {parent, child}", {id, childId})
                },[liftChildWindow, id]),
                closeChildWindow,
                hideChildWindow: useCallback((childId)=>{
                    hideChildWindow({id,childId});
                    console.log("hideChildWindow: {parent, child}", {id, childId})
                },[hideChildWindow, id]),
                unhideChildWindow: useCallback((childId)=>{
                    unhideChildWindow({id,childId});
                    console.log("unhideChildWindow: {parent, child}", {id, childId})
                },[unhideChildWindow, id]),
            }
        }
    }
}