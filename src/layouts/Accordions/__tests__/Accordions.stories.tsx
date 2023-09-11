import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import Accordions from 'layouts/Accordions';

export default {
	title: 'layouts/Accordions',
	component: Accordions,
} as ComponentMeta<typeof Accordions>;

export const Interactive: ComponentStoryObj<typeof Accordions> = {};
