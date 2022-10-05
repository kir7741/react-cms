import React from 'react';
import { storiesOf } from '@storybook/react';

import NavMenuItem from 'components/molecules/NavMenuItem';

const stories = storiesOf('molecules/NavMenuItem', module);

stories.add('__interactive', () => <NavMenuItem />);
