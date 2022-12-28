import React from 'react';
import { storiesOf } from '@storybook/react';

import Datepickers from 'layouts/Datepickers';

const stories = storiesOf('layouts/Datepickers', module);

stories.add('__interactive', () => <Datepickers />);
