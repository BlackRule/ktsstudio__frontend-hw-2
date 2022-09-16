import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckBox } from './CheckBox';

export default {
  title: 'CheckBox',
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

export const Default: ComponentStory<typeof CheckBox> = (args) => (
  <div
    style={{ border: '6px white solid', display: 'flex', width: 'fit-content' }}
  >
    <CheckBox {...args} />
  </div>
);
Default.args = {
  disabled: false,
  checked: false,
  onClick: () => alert('clickable'),
};
