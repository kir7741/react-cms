import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import NavMenuItem from 'components/molecules/NavMenuItem';

export default {
	title: 'molecules/NavMenuItem',
	component: NavMenuItem,
} as ComponentMeta<typeof NavMenuItem>;

export const Interactive: ComponentStoryObj<typeof NavMenuItem> = {};
