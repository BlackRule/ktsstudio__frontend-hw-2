import React, {useState} from 'react';

import {ComponentStory} from '@storybook/react';

import {Input} from './Input';

export const Default: ComponentStory<typeof Input> = (args) => {
    const [value, setValue] = useState<string>(args.value)
        return (<div style={{border: "6px white solid", display: "flex", width: "fit-content"}}>
            <Input {...args} value={value} onChange={(val)=>{setValue(val)}}/></div>)
}
const Default_ = Default.bind({})
export default Default_
Default.args = {
    value:'',
    disabled: false,
    placeholder:'Search property'
}