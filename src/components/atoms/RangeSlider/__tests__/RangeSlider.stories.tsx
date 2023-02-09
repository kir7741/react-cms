import type { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import RangeSlider from 'components/atoms/RangeSlider';

export default {
	title: 'atoms/RangeSlider',
	component: RangeSlider,
} as ComponentMeta<typeof RangeSlider>;

export const Interactive: ComponentStoryObj<typeof RangeSlider> = {};
