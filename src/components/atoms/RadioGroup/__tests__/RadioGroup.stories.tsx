import React from 'react';
import { storiesOf } from '@storybook/react';

import { RadioGroup } from 'components/atoms/RadioGroup';

const stories = storiesOf('atoms/RadioGroup', module);

stories.add('__interactive', () => <RadioGroup value='' options={[]} name='' onChangeValue={() => {}} />);
