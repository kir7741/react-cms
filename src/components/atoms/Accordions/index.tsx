import React from 'react';
import classnames from 'classnames';

import styles from './index.module.css';

interface AccordionsProperty {
	className: string;
}

const Accordions: React.FC<AccordionsProperty> = ({ className }) => (
	<div className={classnames(styles.accordions, className)}>Accordions</div>
);

export default Accordions;
