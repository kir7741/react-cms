import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import Dropdown from 'components/atoms/Dropdown';

export default {
	title: 'atoms/Dropdown',
	component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

export const Interactive: ComponentStoryObj<typeof Dropdown> = {};
