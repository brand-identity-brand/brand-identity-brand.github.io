import { useOsState as useApplicationsState } from "../kernel/useApplicationsStore";
import { useOsState as useWindowsState } from "../kernel/useWindowsStore";

export default function OS({...props}){
    const {
        message
    } = props;
    const applications = useApplicationsState();
    const windows = useWindowsState();
    return (
        <div>
            <div>
                {`os message: ${message}`}
            </div>
            <div>
                {JSON.stringify(applications)}
            </div>
            
            <div>
                {JSON.stringify(windows)}
            </div>
        </div>
    )
}