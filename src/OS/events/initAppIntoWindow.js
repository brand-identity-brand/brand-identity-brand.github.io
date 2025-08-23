import useKernelContext from "../kernel/useKernelContext";
//! maybe this should be inside KernelContext
export function useInitAppIntoWindowHook(){
    //
    const { hooks: { windows, apps } } = useKernelContext();    
    const { useApplicationsContoller,  useApplicationsState } = apps; 
    const { useWindowsContollers } = windows;
    //
    const { registerApplication } = useApplicationsContoller();
    const appsStates = useApplicationsState(); //?
    const { registerWindow, registerChildWindow} = useWindowsContollers();
    return {
        registerApplication,
        registerWindow, registerChildWindow,
        appsStates
    }
}
export default function initAppIntoWindow({ctx, mode,appName, windowId, application, window}){
    return function res(e){    
        const {
            registerApplication,
            registerWindow, registerChildWindow,
            applications
        } = ctx;
        // *

        const applicationsArr =  Object.entries(applications); // * [id, { ...application }]
        // *
        const findDuplicateAppName = applicationsArr.filter( app => app[1].Component === appName) 
        
        switch( mode ){
            case "unique": {
                if ( findDuplicateAppName.length > 1 ) {
                    // !
                    console.log("!: ", "generateAppId found 2 identical keys. impossible!")
                } else if ( findDuplicateAppName.length === 1 ) {
                    // * app already rendered. 
                    console.log("app already rendered. do nothing")

                } else {
   
                    const id = application.Component;
                    registerApplication({
                        id,
                        application
                    });
                    registerWindow({
                        id,
                        window: {
                            ...window,
                            applicationId: id,
                            props: {
                                title: id,
                                ...window.props
                            },
                            
                        }
                    });
                    registerChildWindow({
                        id: windowId,
                        childId: id
                    })

                };
                break;
            }
            case "multi": {
                const nextSqeuence = () => {
                    if ( findDuplicateAppName.length === 0 ) return 0;
                    const sequences = findDuplicateAppName.map( app =>{
                        // TODO: add a shape shifter in store hooks to automatically transform "IdString" into JSON.stringify(["IdString"])
                        if ( app[0] === appName ) {
                            // return [appName, 0]
                            return 0;
                        // } else if ( app[0] ===  `[${appName}]` ) {
                        //     // return [appName, 0]
                        //     return 0;
                        } else {
                            
                            // return JSON.parse( app[0] )
                            return JSON.parse( app[0] )[1];
                        }
                    } );
                    return Math.max(...sequences) + 1;
                }
                const id = JSON.stringify([ appName, nextSqeuence() ]);
                registerApplication({
                    id,
                    application
                });
                registerWindow({
                    id,
                    window: {
                        
                        applicationId: id,
                        props: {
                            title: id,
                            ...window.props
                        },
                        ...window,
                    }
                });
                registerChildWindow({
                    id: windowId,
                    childId: id
                });
                break;
            }
            case "mirror" :{
                break;
            }
        }
    }
}