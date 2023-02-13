import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import LoginTwo from 'layouts/LoginTwo';

export default {
	title: 'layouts/LoginTwo',
	component: LoginTwo,
} as ComponentMeta<typeof LoginTwo>;

export const Interactive: ComponentStoryObj<typeof LoginTwo> = {};
