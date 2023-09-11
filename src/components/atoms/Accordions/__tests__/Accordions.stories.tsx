import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import Accordions from 'components/atoms/Accordions';

export default {
	title: 'atoms/Accordions',
	component: Accordions,
} as ComponentMeta<typeof Accordions>;

export const Interactive: ComponentStoryObj<typeof Accordions> = {};
