import React from 'react';
import classnames from 'classnames';

import Accordion from 'components/atoms/Accordion';

import Grid from 'grid.css';
import styles from './index.module.css';

const Accordions: React.FC = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [isOpen2, setIsOpen2] = React.useState(false);
	return (
		<div className={classnames(styles.accordions, Grid.row2)}>
			<div className={styles.leftPart}>
				<Accordion title="我是標題" isOpen={isOpen} onToggleOpen={setIsOpen}>
					我是內文
				</Accordion>
				<Accordion title="我是標題2" isOpen={isOpen2} onToggleOpen={setIsOpen2}>
					我是內文2
				</Accordion>
			</div>
		</div>
	);
};

export default Accordions;
