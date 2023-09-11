import React from 'react';
import classnames from 'classnames';

import Accordion from 'components/atoms/Accordion';

import Grid from 'grid.css';
import styles from './index.module.css';

const Accordions: React.FC = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<div className={classnames(styles.accordions, Grid.row2)}>
			<div className={styles.leftPart}>
				<Accordion title="我是標題ㄌ" isOpen={isOpen} onToggleOpen={setIsOpen}>
					我是內文
				</Accordion>
			</div>
		</div>
	);
};

export default Accordions;
