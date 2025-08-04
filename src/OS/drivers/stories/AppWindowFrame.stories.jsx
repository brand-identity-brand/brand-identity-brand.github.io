import { expect, userEvent, within } from 'storybook/test';
import AppWindowFrame from '../AppWindowFrame';

export default {
  title: 'UI/AppWindowFrame',
  component: AppWindowFrame,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
  }
};

export const Default = {
    title: "90"
  // parameters: {
    
  // },
  
};

export const withTop = {
    args: {
        config: {}
    },
    render: (args) => {
      return(
        <AppWindowFrame>
          <AppWindowFrame.Top>
            <div style={{width:"100%", height:"100%", backgroundColor:"pink"}}> top </div>
          </AppWindowFrame.Top>
          <AppWindowFrame.Mid>
0
          </AppWindowFrame.Mid>
          <AppWindowFrame.Bot>
            <div style={{width:"100%", height:"100%", backgroundColor:"pink"}}> bot </div>
          </AppWindowFrame.Bot>
        </AppWindowFrame>
      )
    }
};

export const withoutTop = {
    args: {
        config: {
          top: { use: false }
        }
    },
    render: (args) => {
      const {
        config
      } = args;
      return(
        <AppWindowFrame config={config}>
          <AppWindowFrame.Mid>
0
          </AppWindowFrame.Mid>
          <AppWindowFrame.Bot>
            <div style={{width:"100%", height:"100%", backgroundColor:"pink"}}> bot </div>
          </AppWindowFrame.Bot>
        </AppWindowFrame>
      )
    }
};