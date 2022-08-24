import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from 'components/atoms/Button';
import { ButtonAppearType } from '../../../../types/enum/button-appear-type.enum';

const stories = storiesOf('atoms/Button', module);

stories.add('__interactive', () => (
	<Button type="submit" text="登入" appear={ButtonAppearType.DEFAULT}/>
));
