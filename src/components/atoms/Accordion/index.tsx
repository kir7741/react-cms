import React from 'react';
import classnames from 'classnames';

import Arrow from 'images/icon/left-arrow.inline.svg';

import styles from './index.module.css';

interface styleMap {
	accordion: string;
	title: string;
	titleText: string;
	arrow: string;
	content: string;
}

interface AccordionProperty {
	style?: Partial<styleMap>;
	title: string;
	isOpen: boolean;
	disabled?: boolean;
	onToggleOpen?: (val: boolean) => void;
	children: React.ReactNode;
}

const Accordion: React.FC<AccordionProperty> = ({
	style = {},
	title,
	isOpen,
	disabled = false,
	onToggleOpen = () => {},
	children,
}) => (
	<div className={classnames(styles.accordion, style.accordion)}>
		<div
			tabIndex={0}
			role="button"
			onKeyDown={() => {}}
			className={classnames(styles.title, style.title, isOpen && styles.open)}
			onClick={() => {
				if (!disabled) {
					onToggleOpen(!isOpen)
				}
			}}
		>
			<div className={classnames(styles.titleText, style.titleText)}>{title}</div>
			<span className={classnames(styles.arrow)}>
				<Arrow />
			</span>
		</div>
		<div className={classnames(styles.content, style.content, isOpen && styles.contentOpen)}>
			<div className={styles.expandable}>
				<div>{children}</div>
			</div>
		</div>
	</div>
);

export default Accordion;
