import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import Datepicker from 'components/atoms/Datepicker';

export default {
	title: 'atoms/Datepicker',
	component: Datepicker,
} as ComponentMeta<typeof Datepicker>;

export const Interactive: ComponentStoryObj<typeof Datepicker> = {};
