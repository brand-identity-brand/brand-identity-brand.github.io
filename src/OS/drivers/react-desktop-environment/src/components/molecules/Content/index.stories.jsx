import StartButton from "../../atoms/StartButton";
import Content from "../Content";
import { useState } from "react";
import StartMenu from "../../atoms/StartMenu";

export default {
    title: 'Molecules/Content',
    component: Content,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen', // 'centered' or 'padded' or 'fullscreen'
    },
}

const Template = (args) => ( <Content {...args} /> );

export const Default = Template.bind({});
Default.args = {
  hasMenuBar: true,
  hasTaskbar: true,
  MenuBar: {
    menuItems: [
      {
        "label": "Save/Load",
        action: ()=>{},
        "items": [
          { "label": "Save", action: ()=>{}, 
          },{
            "label": "Load",
            action: ()=>{},
          },{
            "label": "Export",
            action: ()=>{},
            "items": [
              { "label": "Haha", action: ()=>{}, 
              }
            ]
          }
        ]
      }
    ]
  },
  StartButton: {
    renderStartButton: () => "U"
  },
  StartMenu: {
    renderStartMenu: ()=>"Unawarehouse",
  },
  renderTheRestOfTaskbar: ()=>{
    return (["Wa", "Sh", "Cu"].map( (i)=>{
      const [showPreview, setShowPreview] = useState(false);
      const togglePreview = () => setShowPreview(!showPreview);
      return (<>
        <StartButton
          // onMouseEnter={togglePreview}
          // onMouseLeave={togglePreview}
        >
          {i}
        </StartButton>
        {/* { showPreview && <StartMenu/> } */}
      </>)
    }))
  }
};

export const WithTabs = Template.bind({});
// const {
// MenuBar,
// StartButton
// } = Default.args;
WithTabs.args = {
  renderTheRestOfTaskbar: ()=>{
    return (["Wa", "Sh", "Cu"].map( (i)=>{
      const [showPreview, setShowPreview] = useState(false);
      const togglePreview = () => setShowPreview(!showPreview);
      return (<>
        <StartButton
          // onMouseEnter={togglePreview}
          // onMouseLeave={togglePreview}
        >
          {i}
        </StartButton>
        {/* { showPreview && <StartMenu/> } */}
      </>)
    }))
  }
};
