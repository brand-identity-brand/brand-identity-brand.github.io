import { useState, createContext } from "react";

export const WindowManagerContext = createContext(null);
WindowManagerContext.displayName = 'WindowManagerContext';

export default function useWindowManager(currentWindowId){
    // stirng = currentWindowId
    // object = has state
    const [ windows, setWindows ] = useState({ active:[], hidden:[], closed:[] });
    const { active, hidden, closed } = windows;
    
    /**
     * registerChildWindow()
     * 
     * registers a child window by windowId
     * it currently registers to active only
     */
    function registerChildWindow(childWindowId /*, type="active"*/){
        // self referencing protection 
        const isSelfReferencing = childWindowId === currentWindowId;
        // duplicate child protection
        const isChildAlreadyRegistered = active.includes(childWindowId) || hidden.includes(childWindowId);
        // protection 0
        if ( isSelfReferencing || isChildAlreadyRegistered ){
            // does nothing if user attempts to register a window inside itself or register two identical child windowId.
        }else{
            //
            setWindows((prev)=> {
                const next = {
                    active: [...prev.active, childWindowId],
                    hidden: prev.hidden,
                    closed: prev.closed
                };
                return next;
            });
        }
    }
    function renderActiveChildrenWindows(renderWindow){
        // TODO render window.hidden as well. z-index -999
        return(<>
            {windows.active.map( (childWindowId)=>{
                return renderWindow(childWindowId)
            } )}

        </>)
    }
    function renderChildrenWindows(renderActiveWindow, renderHiddenWindow){
        // TODO render window.hidden as well. z-index -999
        return(<>
            {/* {windows.active.map( (childWindowId)=>{
                return renderActiveWindow(childWindowId)
            } )}
            {windows.hidden.map( (childWindowId)=>{
                return renderHiddenWindow(childWindowId)
            } )} */}
            {windows.active.map( (childWindowId)=>{
                if (windows.hidden.includes(childWindowId)) {
                    return renderHiddenWindow(childWindowId)
                } else {
                    return renderActiveWindow(childWindowId)

                }
            } )}
        </>)
    }
    // function renderActiveChildrenWindows(temp_childrenWindowsRegistry, extras){
        
    //     return(<>
    //         {windows.active.map( (childWindowId)=>{
    //             const Component = temp_childrenWindowsRegistry[childWindowId].Component;
    //             const props = temp_childrenWindowsRegistry[childWindowId].props;
    //             return (
    //                 <Component key={childWindowId} {...props} {...extras} />
    //             )
    //         } )}
    //     </>)
    // }
    // function initRegisterChildWindow(windowId, windowSpecs){
    //     const { Component, ...rest } = windowSpecs;
    //     initWindow(windowId, {
    //         Component: Component.displayName,
    //         ...rest
    //     });
    //     registerChildWindow(windowId); 
    // }
    /* pass below functions from parent Context*/
    function liftChildWindowToTop(childWindowId){
        // do nothing if window is already at the top
        const windowPosition = active.indexOf(childWindowId);
        if ( windowPosition === active.length - 1 ) return;
        
        // rearrang childWindowId to the last position.
        setWindows((prev)=> {
            const nextWithoutId = prev.active.filter( item => {
                if (item === childWindowId) return false;
                return true;
            });
            const next = {
                active: [...nextWithoutId, childWindowId],
                hidden: prev.hidden,
                closed: prev.closed
            };
            return next;
        });
    }
    /**
     * checker0: if id is duplicated abort appending to hiddenWindowsRef.
     * @param {*} childWindowId 
     */

    function _hideChildWindow(childWindowId){

        const nextActive = active.filter( (value) => {
            if ( value === childWindowId ) return false;
            return true;
        });
        //checker0
        if ( nextActive.length === active.length ) return;
        //checker0 passed
        setWindows((prev)=> {
            const next = {
                active: nextActive,
                hidden: [...prev.hidden, childWindowId],
                closed: prev.closed
            }
            return next;
        });
    }

    function hideChildWindow(childWindowId){
        //checker0 passed
        setWindows((prev)=> {
            const next = {
                active: prev.active,
                hidden: [...prev.hidden, childWindowId],
                closed: prev.closed
            }
            return next;
        });
    }

    function _unhideChildWindow(childWindowId){
        const nextHidden = hidden.filter( (value) => {
            if ( value === childWindowId ) return false;
            return true;
        });
        //checker0
        if ( nextHidden.length === hidden.length ) return;
        //checker0 passed
        setWindows((prev)=> {
            const next = {
                active: [...prev.active, childWindowId],
                hidden: nextHidden,
                closed: prev.closed
            }
            return next;
        });
    }
    function unhideChildWindow(childWindowId){
        const nextHidden = hidden.filter( (value) => {
            if ( value === childWindowId ) return false;
            return true;
        });
        if ( nextHidden.length === hidden.length ) return;
        //checker0 passed
        setWindows((prev)=> {
            const next = {
                //[...prev.active, childWindowId],
                /**
                 * I thought active: [...prev.active, childWindowId] is needed for active
                 * however, this produces another identical window based on its first mount props
                 * while also lifting the hidden window to the top.
                 * 
                 * simply reusing the pre.active is good enough
                 * will probably need to call lifeWindowToTop along with unhideChildWindow
                 * TODO: liftWindowToTop + unhideChildWindow read above
                 */
                active: prev.active,
                hidden: nextHidden,
                closed: prev.closed
            }
            return next;
        });
    }
    // loop through registeredId
    // update all windows spec if applicable
    // TODO: this will support window historys. specifics are to be determined
    function closeChildWindow(childWindowId, status){
        // prepare closed windowId for archiving.
        const timestamp = Date.now();
        const nextChildWindowId = `${childWindowId}@${timestamp}`;
        // get child window's children
        // { active, hidden, closed } = childenWindowSpecs.windows
        const childWindowSpecs = getTargetWindowSpecsById(childWindowId);
        const childWindowRegisteredIn = childWindowSpecs.registeredIn
        // update registeredIn spec of the childWindow
        const nextChildWindowRegisteredIn = childWindowRegisteredIn.filter( parentWindowId => parentWindowId !== currentWindowId );
        setTargetWindowSpecsById( childWindowId, { registeredIn: nextChildWindowRegisteredIn });
        switch (status) {
            case 'active': {
                //checker0
                const fromActive = active.includes(childWindowId);
                if ( fromActive === false ) break;
                //checker0 passed
                const nextActive = active.filter( (value) => {
                    if ( value === childWindowId ) return false;
                    return true;
                });
                setWindows((prev)=> {
                    const next = {
                        active: nextActive,
                        hidden: prev.hidden,
                        closed: [...prev.closed, nextChildWindowId]
                    };
                    setTargetWindowSpecsById(currentWindowId, { windows: next})
                    return next;
                });
                break;
            }
            case 'hidden': {
                //checker0
                const fromHidden = hidden.includes(childWindowId);
                if (fromHidden === false ) break;
                //checker0 passed
                const nextHidden = hidden.filter( (value) => {
                    if ( value === childWindowId ) return false;
                    return true;
                });
                setWindows((prev)=> {
                    const next = {
                        active: prev.active,
                        hidden: nextHidden,
                        closed: [...prev.closed, nextChildWindowId]
                    }
                    setTargetWindowSpecsById(currentWindowId, { windows: next})
                    return next;
                });
                break;
            }
            default: {
                //checker0
                const fromActive = active.includes(childWindowId);
                const fromHidden = hidden.includes(childWindowId);
                if ( fromActive === false && fromHidden === false ) break;
                //checker0 passed
                const nextActiveHidden = { active, hidden };
                if ( fromActive === true ) {
                    nextActiveHidden.active = active.filter( (value) => {
                        if ( value === childWindowId ) return false;
                        return true;
                    });
                }
                if ( fromHidden === true ) {
                    nextActiveHidden.hidden = hidden.filter( (value) => {
                        if ( value === childWindowId ) return false;
                        return true;
                    });
                }
                setWindows((prev)=> {
                    const next = {
                        active: nextActiveHidden.active,
                        hidden: nextActiveHidden.hidden,
                        closed: [...prev.closed, nextChildWindowId]
                    }
                    setTargetWindowSpecsById(currentWindowId, { windows: next})
                    return next;
                });
            }
        }

        if ( getTargetWindowSpecsById(childWindowId).registeredIn.length === 0 ) {
            reassginTargetWindowId(childWindowId, nextChildWindowId)
        } else {
            const allWindowSpecs = getAllWindowSpecs();
            const nextAllWindowSpecs = { ...allWindowSpecs, [nextChildWindowId]: childWindowSpecs }
            setAllWindowSpecs( nextAllWindowSpecs )
        }
        
    }
    function temp_closeChildWindow(childWindowId, status){
        // * in the complete version this would attach unix timestamp at close
        const nextChildWindowId = childWindowId;

        switch (status) {
            case 'active': {
                //checker0
                const fromActive = active.includes(childWindowId);
                if ( fromActive === false ) break;
                //checker0 passed
                const nextActive = active.filter( (value) => {
                    if ( value === childWindowId ) return false;
                    return true;
                });
                setWindows((prev)=> {
                    const next = {
                        active: nextActive,
                        hidden: prev.hidden,
                        closed: [...prev.closed, nextChildWindowId]
                    };
                    // setTargetWindowSpecsById(currentWindowId, { windows: next})
                    return next;
                });
                break;
            }
            case 'hidden': {
                //checker0
                const fromHidden = hidden.includes(childWindowId);
                if (fromHidden === false ) break;
                //checker0 passed
                const nextHidden = hidden.filter( (value) => {
                    if ( value === childWindowId ) return false;
                    return true;
                });
                setWindows((prev)=> {
                    const next = {
                        active: prev.active,
                        hidden: nextHidden,
                        closed: [...prev.closed, nextChildWindowId]
                    }
                    // setTargetWindowSpecsById(currentWindowId, { windows: next})
                    return next;
                });
                break;
            }
            default: {
                //checker0
                const fromActive = active.includes(childWindowId);
                const fromHidden = hidden.includes(childWindowId);
                if ( fromActive === false && fromHidden === false ) break;
                //checker0 passed
                const nextActiveHidden = { active, hidden };
                if ( fromActive === true ) {
                    nextActiveHidden.active = active.filter( (value) => {
                        if ( value === childWindowId ) return false;
                        return true;
                    });
                }
                if ( fromHidden === true ) {
                    nextActiveHidden.hidden = hidden.filter( (value) => {
                        if ( value === childWindowId ) return false;
                        return true;
                    });
                }
                setWindows((prev)=> {
                    const next = {
                        active: nextActiveHidden.active,
                        hidden: nextActiveHidden.hidden,
                        closed: [...prev.closed, nextChildWindowId]
                    }
                    // setTargetWindowSpecsById(currentWindowId, { windows: next})
                    return next;
                });
            }
        }
        // * udpate registeredIn
        // TODO: support multiple registration
        // ! this does not support multiple registration
        // ! possible solution:
        //  ! register all setWindows and setStates to WindowManagerRegistrationContext
        //  ! loop or use recursion to apply changes to all parent windows
        //  ! e.g. closeWindow(childWindowId, parentWindowId, status)
        // removes the window from allSpecs
        // const allWindowSpecs = ;
        // const { [nextChildWindowId]: childWindowSpecs, ...nextAllWindowSpecs } = allWindowSpecs;
        // setAllWindowSpecs( {...nextAllWindowSpecs} )

        // TODO: priority
        // cascade closeWindow for children
        //! RUN a custom callback. gives users to do something each rerender
    }

    return {
        currentWindowId,
        managers: {
            windows,
            registerChildWindow,
        },
        renderers:{
            renderActiveChildrenWindows,
            renderChildrenWindows
        },
        arrangers:{
            liftChildWindowToTop,
            hideChildWindow,
            unhideChildWindow,
            // TODO
            closeChildWindow: temp_closeChildWindow,
        },

    }
}
