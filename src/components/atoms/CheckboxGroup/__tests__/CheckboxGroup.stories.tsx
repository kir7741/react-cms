import React from 'react';
import { storiesOf } from '@storybook/react';

import CheckboxGroup from 'components/atoms/CheckboxGroup';

const stories = storiesOf('atoms/CheckboxGroup', module);

stories.add('__interactive', () => <CheckboxGroup />);
