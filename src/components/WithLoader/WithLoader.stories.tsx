import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { WithLoader } from './WithLoader';
import img1 from "@media/img1.png";
import {Card, CardProps} from "../Card/Card";

export default {
    title: 'WithLoader',
    component: WithLoader,
} as ComponentMeta<typeof WithLoader>;

const cardArgs:CardProps = {
    image: img1,
    category: 'Chair',
    title: 'White Aesthetic Chair',
    description: 'Combination of wood and wool',
    price: '$63.47',
    onClick: () => alert("clickable")
}

export const Default: ComponentStory<typeof WithLoader> = (args) =>
    <div style={{border:"6px white solid",display:"flex",width:"fit-content"}}>
        <WithLoader {...args}><Card {...cardArgs}/></WithLoader>
    </div>;
Default.args = {
    loading:true
}