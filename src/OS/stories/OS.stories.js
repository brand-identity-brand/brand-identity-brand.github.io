import { expect, userEvent, within } from 'storybook/test';
// import { windowsStore, appsStore } from '../../applications/store';
import OS from '..';

export default {
  title: 'OS',
  component: OS,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    // INSTALLED_APPLICATIONS:INSTALLED_APPLICATIONS,
    // windowsStore:windowsStore,
    // appsStore:appsStore
  }
};

export const Default = {
  // parameters: {
    
  // },
  
};
Default.storyName = "{}";

export const ModeDemo = {
  args: {
    mode: "demo"
  }
};
ModeDemo.storyName = "{mode: 'demo'}";

import { createAppsStore } from '../kernel/useApplicationsStore';
import { createWindowsStore } from '../kernel/useWindowsStore';

const appsStore = createAppsStore({})
const windowsStore = createWindowsStore({})
export const withStores = {
  args: {
    appsStore: appsStore,
    windowsStore: windowsStore 
  }
};
Default.storyName = "{ appsStore, windowsStore }";