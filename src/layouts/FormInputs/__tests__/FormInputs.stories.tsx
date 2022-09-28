import React from 'react';
import { storiesOf } from '@storybook/react';

import FormInputs from 'layouts/FormInputs';

const stories = storiesOf('layouts/FormInputs', module);

stories.add('__interactive', () => <FormInputs />);
