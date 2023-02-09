import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import Input from 'components/atoms/Input';

export default {
	title: 'atoms/Input',
	component: Input,
} as ComponentMeta<typeof Input>;

export const Interactive: ComponentStoryObj<typeof Input> = {};
