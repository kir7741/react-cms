import React from 'react';
import { storiesOf } from '@storybook/react';

import Dropdown from 'components/atoms/Dropdown';

const stories = storiesOf('atoms/Dropdown', module);

stories.add('__interactive', () => <Dropdown valueComponent={() => <></>} panelComponent={() => <></>}/>);
