import useKernelContext from "../kernel/useKernelContext";


export default function ApplicationManagerRenderer({...props}){
    const {
        id, //"Kernel"
        windowId, //"Kernel"
    } = props;
    // const 
    
    const {
        applicationRegistry,
        hooks
    } = useKernelContext();

    const applicationState = hooks.apps.useApplicationState({id});

    const {
        Component,
        props: applicationProps
    } = applicationState;

    // TODO: this part should be used once in useAppsStore.
    // TODO: or...?
    const Application = applicationRegistry[Component];

    return (
        <Application {...applicationProps} applicationId={id} windowId={windowId}  applicationRegistry={applicationRegistry} />
        //     {children}
        // </Application>
    )
}

// ! use Context to pass INSTALLED_APPLICATIONS