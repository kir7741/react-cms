import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import Navigation from 'components/organisms/Navigation';

export default {
	title: 'organisms/Navigation',
	component: Navigation,
} as ComponentMeta<typeof Navigation>;

export const Interactive: ComponentStoryObj<typeof Navigation> = {};
