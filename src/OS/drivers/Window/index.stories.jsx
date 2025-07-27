import Window from ".";


export default {
  title: 'Components/Window',
  component: Window,
  tags: ['autodocs'],
  argTypes: {
    // label: { control: 'text' },
    // onClick: { action: 'clicked' },
    // disabled: { control: 'boolean' },
  },
};

const Template = (args) => <Window {...args} />;

export const Default = Template.bind({});
Default.args = {
  onFocus: ()=>{},
  onMinimise: ()=>{console.log("minimised")},
  onClose: ()=>{console.log("closed")}
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
