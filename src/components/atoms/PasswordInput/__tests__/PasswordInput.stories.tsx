import React from 'react';
import { storiesOf } from '@storybook/react';

import PasswordInput from 'components/atoms/PasswordInput';

const stories = storiesOf('atoms/PasswordInput', module);

stories.add('__interactive', () => <PasswordInput />);
