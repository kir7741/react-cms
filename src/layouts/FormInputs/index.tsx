import React from 'react';
import classnames from 'classnames';

import styles from './index.css';

interface FormInputsProperty { }

const FormInputs: React.FC<FormInputsProperty> = ({ className }) => (
	<div className={classnames(styles.formInputs, className)}>FormInputs</div>
);

export default FormInputs;
