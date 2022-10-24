import React from 'react';
import { storiesOf } from '@storybook/react';

import DropdownSelect from 'components/atoms/DropdownSelect';

const stories = storiesOf('atoms/DropdownSelect', module);

stories.add('__interactive', () => <DropdownSelect options={[]} selectedId=''/>);
