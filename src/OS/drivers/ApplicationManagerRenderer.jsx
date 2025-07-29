import { useApplicationState } from "../kernel/useApplicationsStore";

import OS from "./OS";

export default function ApplicationManagerRenderer({...props}){
    const {
        id,
        INSTALLED_APPLICATIONS
    } = props;
    const applicationRegistry = {
        OS,
        ...INSTALLED_APPLICATIONS
    };
   
    const applicationState = useApplicationState({id});
    const {
        Component,
        props: applicationProps
    } = applicationState;
    
    const Application = applicationRegistry[Component];

    return (
        <Application {...applicationProps} />
    )
}
