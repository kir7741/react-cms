import React from 'react';
import classnames from 'classnames';

import styles from './index.css';

interface CheckboxProperty { }

const Checkbox: React.FC<CheckboxProperty> = ({ className }) => (
	<div className={classnames(styles.checkbox, className)}>Checkbox</div>
);

export default Checkbox;
