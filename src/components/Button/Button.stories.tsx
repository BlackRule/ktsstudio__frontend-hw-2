import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Default: ComponentStory<typeof Button> = (args) => (
  <div
    style={{ border: '6px white solid', display: 'flex', width: 'fit-content' }}
  >
    <Button {...args} />
  </div>
);
Default.args = {
  children: 'Find Now',
  disabled: false,
};
