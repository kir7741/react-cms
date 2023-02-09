import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import Datepickers from 'layouts/Datepickers';

export default {
	title: 'layouts/Datepickers',
	component: Datepickers,
} as ComponentMeta<typeof Datepickers>;

export const Interactive: ComponentStoryObj<typeof Datepickers> = {};
