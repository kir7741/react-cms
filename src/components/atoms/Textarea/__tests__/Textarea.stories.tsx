import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import Textarea from 'components/atoms/Textarea';

export default {
	title: 'atoms/Textarea',
	component: Textarea,
} as ComponentMeta<typeof Textarea>;

export const Interactive: ComponentStoryObj<typeof Textarea> = {};
