import React, { useState } from 'react';
import classnames from 'classnames';

import styles from './index.module.css';

interface valueComponentProperty {

	/**
	 * 是否展開
	 *
	 * @type {boolean}
	 * @memberof valueComponentProperty
	 */
	isOpen: boolean;

}

interface DropdownProperty {
	className?: string;
	valueComponent: (props: valueComponentProperty) => JSX.Element,
	panelComponent: () => JSX.Element,
}

const Dropdown: React.FC<DropdownProperty> = ({
	className,
	valueComponent,
	panelComponent,
}) => {

	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={classnames(styles.dropdownWrapper, className)}>
			<div
				role="button"
				tabIndex={0}
				onKeyPress={() => {}}
				onClick={() => {
					setIsOpen(pre => !pre)
				}}
			>
				{valueComponent({ isOpen })}
				{
					isOpen && panelComponent()
				}
			</div>
		</div>
	);
};

export default Dropdown;
