import { create } from 'zustand';
import { ROOT_APPS } from '../constants';

export function createAppsStore(applications={}){
    return create((set, get) => ({
        applications: {
            ...ROOT_APPS,
            ...applications
        },
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
        },
        setApplicationState: function setState({id, state}){
            const { key, value } = state;
            set((state) => {
                const application = state.applications[id];
                const { states }= application;
                const res = {
                    ...states,
                    [id]: {
                        ...states[id],
                        [key]: value
                    }
                };
                return res;
            });
        },
    }));
}
// const window = useWindowsStore((state) => state.windows[id]);
// const registerChildWindow = useWindowStore((state)=> state.registerChildWindow);
// ! [MOBILE] mobile version uses the same window and app store. enabling state sharing bewtween desktop and mobile portal.

export function useAppsHooks(appsStore){
    const useApplicationsStore = appsStore;
    return {
        useApplicationsState: function useApplicationsState(){
            const applications = useApplicationsStore((s)=>s.applications);
            return applications
        },
        useApplicationState: function useApplicationState({id}){
            const Component = useApplicationsStore((s)=>s.applications[id].Component);
            const props = useApplicationsStore((s)=>s.applications[id].props);
            const states = useApplicationsStore((s)=>s.applications[id].states);
            return {
                Component,
                props,
                states
            }
        },
        //TODO: 20250805
        //TODO: refactor Desktop from unaware-house // <- kept in unware-house
        //TODO: refactor AppletFrame (Tabs and Panel) // 
        //TODO: implement useKernellState 
        // parent apps loading the child app(let) can either pass useKernelState or useState.
        // meaning the component should be sharing a same API with these 2.
        // useState will have to be refactored so it takes the extra data from KernelState implementations
        // instead of value it gets { id, state: { keu, value } }
        useKernellState: function useState({id, state}){
            const { key, value } = state;
            const states = useApplicationsStore((s)=>s.applications[id].states);
            const setApplicationState = useApplicationsStore((s)=>s.applications.setApplicationState);

            setApplicationState({ id, state });
            // Set initial value on first mount
            useEffect(() => {
                if (states?.[key] === undefined) {
                setApplicationState({ id, state });
                }
            }, []);

            return [
               states[key],
               (state)=>setApplicationState({id, state})
            ]
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
