import React from 'react';
import classnames from 'classnames';

import Arrow from 'images/icon/left-arrow.inline.svg';

import styles from './index.module.css';

interface AccordionProperty {
	className?: string;
	title: string;
	isOpen: boolean;
	onToggleOpen?: (val: boolean) => void;
	children: React.ReactNode;
}

const Accordion: React.FC<AccordionProperty> = ({ className, title, isOpen, onToggleOpen = () => {}, children }) => (
	<div className={classnames(styles.accordion, className)}>
		<div
			tabIndex={0}
			role="button"
			onKeyDown={() => {}}
			className={classnames(styles.title, isOpen && styles.open)}
			onClick={() => onToggleOpen(!isOpen)}
		>
			<div className={classnames(styles.titleText)}>{title}</div>
			<span className={classnames(styles.arrow)}><Arrow /></span>
		</div>
		<div className={classnames(styles.content, isOpen && styles.open)}>
			<div className={styles.expandable}>
				<div>{children}</div>
			</div>
		</div>
	</div>
);

export default Accordion;
