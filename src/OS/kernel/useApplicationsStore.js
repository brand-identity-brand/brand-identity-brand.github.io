import { create } from 'zustand';
//
import getOSConstants from '../constants';
const { APPLICATIONS } = getOSConstants();

export function createAppsStore(applications){
    return create((set, get) => ({
        applications: {...applications},
    // You can add mutators here
        registerApplication: function registerApplication({id, application}){
            set((state) => {
                const { applications } = state;
                if ( applications[id]) {
                    throw new Error(`Duplicate application ID "${id}" in useApplicationsStore.`);
                }
                return {
                    applications: {
                        ...applications, 
                        [id]: application,
                    },
                };
            });
            return id;
        },
        closeApplication: function closeApplication({id}){
            // * id -> parent window id
            set((state) => {
                const { applications } = state;
                if (!applications[id]) {
                    throw new Error(`Missing application ID "${id}" in useApplicationsStore.`);
                }
                delete applications[id]
                const { [id]: _, ...next } = applications;
                return {
                    applications: {
                        ...next
                    },
                };
            });
            //TODO: some window might be headless.
            return id
        }
    }));
}
// const window = useWindowsStore((state) => state.windows[id]);
// const registerChildWindow = useWindowStore((state)=> state.registerChildWindow);
// ! [MOBILE] mobile version uses the same window and app store. enabling state sharing bewtween desktop and mobile portal.

export function useAppsHooks(appsStore){
    const useApplicationsStore = appsStore;
    return {
        useApplicationState: function useApplicationState({id}){
            console.log(id)
            // const application = useWindowsStore((s)=>s.applications[id]);
            const Component = useApplicationsStore((s)=>s.applications[id].Component);
            const props = useApplicationsStore((s)=>s.applications[id].props);
            
            return {
                Component,
                props
            }
        },
        // * this returns the target id window contollers
        useApplicationsContoller: function useApplicationsContoller(){
            const registerApplication = useApplicationsStore(s => s.registerApplication);
            const closeApplication = useApplicationsStore(s => s.closeApplication);
            return { 
                registerApplication, 
                closeApplication 
            };
        }
    }
}
