import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import RadioGroup from 'components/atoms/RadioGroup';

export default {
	title: 'atoms/RadioGroup',
	component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>;

export const Interactive: ComponentStoryObj<typeof RadioGroup> = {};
