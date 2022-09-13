import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Loader } from './Loader';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>;

export const Default: ComponentStory<typeof Loader> = (args) => (
  <div
    style={{ border: '6px white solid', display: 'flex', width: 'fit-content' }}
  >
    <Loader {...args} />
  </div>
);
Default.args = {
  loading: true,
};
