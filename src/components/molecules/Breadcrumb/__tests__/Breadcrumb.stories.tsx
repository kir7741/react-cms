import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import Breadcrumb from 'components/molecules/Breadcrumb';

export default {
	title: 'molecules/Breadcrumb',
	component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;

export const Interactive: ComponentStoryObj<typeof Breadcrumb> = {};
