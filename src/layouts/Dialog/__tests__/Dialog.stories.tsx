import React from 'react';
import { storiesOf } from '@storybook/react';

import Dialog from 'layouts/Dialog';

const stories = storiesOf('layouts/Dialog', module);

stories.add('__interactive', () => <Dialog />);
