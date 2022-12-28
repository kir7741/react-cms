import React from 'react';
import { storiesOf } from '@storybook/react';

import Datepicker from 'components/atoms/Datepicker';

const stories = storiesOf('atoms/Datepicker', module);

stories.add('__interactive', () => <Datepicker />);
