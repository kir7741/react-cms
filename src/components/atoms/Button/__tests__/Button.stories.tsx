import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import Button from 'components/atoms/Button';

export default {
	title: 'atoms/Button',
	component: Button,
} as ComponentMeta<typeof Button>;

export const Interactive: ComponentStoryObj<typeof Button> = {};
