import React from 'react';
import { storiesOf } from '@storybook/react';

import RangeSlider from 'components/atoms/RangeSlider';

const stories = storiesOf('atoms/RangeSlider', module);

stories.add('__interactive', () => <RangeSlider />);
