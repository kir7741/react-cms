import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import Accordion from 'components/atoms/Accordion';

export default {
	title: 'atoms/Accordion',
	component: Accordion,
} as ComponentMeta<typeof Accordion>;

export const Interactive: ComponentStoryObj<typeof Accordion> = {};
