import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MultiDropdown, Option } from './MultiDropdown';

export default {
  title: 'MultiDropdown',
  component: MultiDropdown,
} as ComponentMeta<typeof MultiDropdown>;

const options: Option[] = [
  { key: 'Chair', value: 'Chair' },
  { key: 'Table', value: 'Table' },
  { key: 'Decoration', value: 'Decoration' },
  { key: 'Cupboard', value: 'Cupboard' },
];

const Default: ComponentStory<typeof MultiDropdown> = (args) => {
  const [value, setValue] = useState<Option[]>(args.value);
  return (
    <div
      style={{
        border: '6px white solid',
        display: 'flex',
        width: 'fit-content',
      }}
    >
      <MultiDropdown
        {...args}
        value={value}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
};
export const Default_ = Default.bind({});
Default_.args = {
  disabled: false,
  options: options,
  generateValueElement: (elements: Option[]) => {
    const s = elements.map((el: Option) => el.key).join();
    return (props) => <div {...props}>{s.length > 0 ? s : 'Category'}</div>;
  },
  value: [],
};
