import create from 'zustand';
import Inventory from '../../applications/Inventory';
import { Component } from 'react';

const useUserStore = create((set) => ({
  data: {
    userId: "",
    groupId: ""
  },               // state variable
}));
const useWindowStore = create((set) => ({
  data: { /** this object is empty until user spawns a new window */
    "Application_example_window_id": {
        windowProps: {
            // props for Window Component.
        },
        application: {
            Component: "Inventory",
            initialProps: {},
            initialStates: {}
        }
    }
  },
  // Replace or merge data for a specific window ID
  setData: (windowId, updater) => {
    set((state) => ({
      data: {
        ...state.data,
        [windowId]: typeof updater === 'function'
          ? updater(state.data[windowId] || {})
          : updater
      }
    }));
  },
}));

const useApplicationStore = create((set) => ({
    // * the data here stores a registry of "applications" and "applets"
    // * frontend use this as a map to retrieve the required component
    // * frontend also rely on this Store to know what state should react load this component with
    // * each user have their states saved in localStorage.
    // * 
    data: {
        "Unawarehouse" : { //base application
            Component: Inventory,
                        onlyAllowOneInstance: true, // check for duplicates. 
            defaultAppProps: {

            },
            defaultAppStates: {
                // 
            },
        },
        "Inventory": {
            Component: Inventory,
            onlyAllowOneInstance: true, // check for duplicates. 
            defaultAppProps: {

            },
            defaultAppStates: {
                // 
            },
            // defaultWindowProps: {

            // }
        }
    },

}));
