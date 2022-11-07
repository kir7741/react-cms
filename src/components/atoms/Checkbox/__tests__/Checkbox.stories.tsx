import React from 'react';
import { storiesOf } from '@storybook/react';

import Checkbox from 'components/atoms/Checkbox';

const stories = storiesOf('atoms/Checkbox', module);

stories.add('__interactive', () => <Checkbox />);
