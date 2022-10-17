import React from 'react';
import { storiesOf } from '@storybook/react';

import Textarea from 'components/atoms/Textarea';

const stories = storiesOf('atoms/Textarea', module);

stories.add('__interactive', () => <Textarea />);
