import StartButton from "../../atoms/StartButton";
import Taskbar from "../Taskbar";
import { useState } from "react";

export default {
    title: 'Atoms/Taskbar',
    component: Taskbar
}

const Template = (args) => <Taskbar {...args} />;

export const Default = Template.bind({});
Default.args = {

};

// export const Disabled = Template.bind({});
// Disabled.args = {
// //   label: 'Disabled Button',
// //   disabled: true,
// };
