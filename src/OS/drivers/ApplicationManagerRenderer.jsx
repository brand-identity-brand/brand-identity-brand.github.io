import { useApplicationState } from "../kernel/useApplicationsStore";
// import { RenderChildrenWindows } from "./WindowManagerRenderer";
import Kernel from "./Kernel";
import GUI from "./GUI";
export default function ApplicationManagerRenderer({...props}){
    const {
        id, //"Kernel"
        windowId, //"Kernel"
        INSTALLED_APPLICATIONS,
    } = props;

    const applicationRegistry = {
        Kernel,
        GUI,
        ...INSTALLED_APPLICATIONS
    };

    const applicationState = useApplicationState({id});

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