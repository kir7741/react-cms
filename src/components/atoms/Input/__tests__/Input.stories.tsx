import React from 'react';
import { storiesOf } from '@storybook/react';

import Input from 'components/atoms/Input';

const stories = storiesOf('atoms/Input', module);

stories.add('__interactive', () => <Input />);
