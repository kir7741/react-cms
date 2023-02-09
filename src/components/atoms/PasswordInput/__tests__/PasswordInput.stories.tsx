import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import PasswordInput from 'components/atoms/PasswordInput';

export default {
	title: 'atoms/PasswordInput',
	component: PasswordInput,
} as ComponentMeta<typeof PasswordInput>;

export const Interactive: ComponentStoryObj<typeof PasswordInput> = {};
