
import { useApplicationState,  useApplicationsContoller } from "../kernel/useApplicationsStore";
import { useWindowState, useWindowContollers } from "../kernel/useWindowsStore";

// * OS Wrapper
import getOSConstants from '../constants';
const { ROOT_WINDOW_ID } = getOSConstants();
import INSTALLED_APPLICATIONS from "../../applications/registry";

/**
 * Application takes two stores
 * application
 * window
 * 
 * @returns 
 */
export function Application({}){
    const applicationState = useApplicationState({id});
    const {
        Component,
        props
    } = applicationState;
    const Root = INSTALLED_APPLICATIONS[Component];
    const applicationsController =  useApplicationsContoller();
    const {
        registerApplication,
        closeApplication
    } = applicationsController;
    return (
        <Component {...props} />
    )
}

/**
 * Wrap any element that wants to use children windows
 * @param {*} param0 
 * @returns 
 */
export function WindowManager({id=ROOT_WINDOW_ID, WindowComponent=DefaultWindowComponent}){


    //* [Component Materials] Window  
    const windowState = useWindowState({id });
    const {
        props: windowProps,
        children: {
            active,
            hidden
        }
    } = windowState;

    // const windowControllers = useWindowContollers({id });
    // const {
    //     registerWindow, // {id, window }
    //     registerChildWindow, // childId
    //     closeChildWindow // childId
    // } = windowControllers;
    return (
        <WindowComponent
            style={{
                width:"100%",
                height:"100%"
            }}
            {...windowProps}
            // {...windowControllers}
        >
            {active.map( id => {
                return (
                    <Application key={id} id={id} WindowComponent={WindowComponent}/>
                )
            })} 
            {hidden.map( id => {
                return id
            })}
            <Root 
                {...applicationProps} 
                {...{ registerApplication, closeApplication }}
                />
        </WindowComponent>
    )
}

function DefaultWindowComponent({children, ...props}){
    return (
        <div {...props}>
            {children}
        </div>
    )
}