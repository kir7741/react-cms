import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import Dialog from 'components/molecules/Dialog';

export default {
	title: 'molecules/Dialog',
	component: Dialog,
} as ComponentMeta<typeof Dialog>;

export const Interactive: ComponentStoryObj<typeof Dialog> = {};
