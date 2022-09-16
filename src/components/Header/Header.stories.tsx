import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header } from './Header';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Header',
  component: Header,
} as ComponentMeta<typeof Header>;

export const Default: ComponentStory<typeof Header> = () => (
  <div style={{ border: '6px white solid' }}>
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  </div>
);
Default.args = {};
