import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import FormInputs from 'layouts/FormInputs';

export default {
	title: 'layouts/FormInputs',
	component: FormInputs,
} as ComponentMeta<typeof FormInputs>;

export const Interactive: ComponentStoryObj<typeof FormInputs> = {};
