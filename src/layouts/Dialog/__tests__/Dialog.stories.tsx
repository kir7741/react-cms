import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import Dialog from 'layouts/Dialog';

export default {
	title: 'layouts/Dialog',
	component: Dialog,
} as ComponentMeta<typeof Dialog>;

export const Interactive: ComponentStoryObj<typeof Dialog> = {};
