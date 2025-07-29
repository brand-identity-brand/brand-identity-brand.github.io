import { useApplicationState } from "../kernel/useApplicationsStore";

import OS from "./OS";
import GUI from "./GUI";
export default function ApplicationManagerRenderer({...props}){
    const {
        id,
        windowId,
        INSTALLED_APPLICATIONS,
        renderChildrenWindow
    } = props;
    const applicationRegistry = {
        OS,
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
        <Application {...applicationProps} windowId={windowId} renderChildrenWindow={renderChildrenWindow}/>
    )
}
