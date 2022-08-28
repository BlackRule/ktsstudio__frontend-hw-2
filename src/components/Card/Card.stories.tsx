import React from 'react';
import img1 from '@media/img1.png'

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Card} from './Card';

export default {
    title: 'Card',
    component: Card,
} as ComponentMeta<typeof Card>;

export const Default: ComponentStory<typeof Card> = (args) =>
    <div style={{border: "6px white solid", display: "flex", width: "fit-content"}}><Card {...args}/></div>;
Default.args = {
    image: img1,
    category: 'Chair',
    title: 'White Aesthetic Chair',
    description: 'Combination of wood and wool',
    price: '$63.47',
    onClick: () => alert("clickable")
}