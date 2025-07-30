// import RenderChildrenWindows from "./WindowManagerRenderer";
import Kernel from "./Kernel";
import GUI from "./GUI";
import useKernelContext from "../kernel/useKernelContext";

export default function ApplicationManagerRenderer({...props}){
    const {
        id, //"Kernel"
        windowId, //"Kernel"
    } = props;
    // const 
    
    const {
        INSTALLED_APPLICATIONS,
        hooks
    } = useKernelContext();

    const applicationRegistry = {
        Kernel,
        GUI,
        ...INSTALLED_APPLICATIONS
    };

    const applicationState = hooks.apps.useApplicationState({id});

    const {
        Component,
        props: applicationProps
    } = applicationState;

    const Application = applicationRegistry[Component];

    return (
        <Application {...applicationProps} applicationId={id} windowId={windowId} INSTALLED_APPLICATIONS={applicationRegistry} />
        //     {children}
        // </Application>
    )
}

// ! use Context to pass INSTALLED_APPLICATIONS