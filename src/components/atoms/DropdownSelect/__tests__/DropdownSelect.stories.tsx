import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import DropdownSelect from 'components/atoms/DropdownSelect';

export default {
	title: 'atoms/DropdownSelect',
	component: DropdownSelect,
} as ComponentMeta<typeof DropdownSelect>;

export const Interactive: ComponentStoryObj<typeof DropdownSelect> = {};
