import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import CheckboxGroup from 'components/atoms/CheckboxGroup';

export default {
	title: 'atoms/CheckboxGroup',
	component: CheckboxGroup,
} as ComponentMeta<typeof CheckboxGroup>;

export const Interactive: ComponentStoryObj<typeof CheckboxGroup> = {};
