import React, { useMemo } from 'react';
import classnames from 'classnames';
import ExpandDown from 'images/icon/expand-arrow-down.inline.svg';

import { OptionBase } from 'types/interfaces/option-base';

import Dropdown from '../Dropdown';
import styles from './index.css';

interface valueComponentProperty {

	/**
	 * 選中的文字
	 *
	 * @type {string}
	 * @memberof valueComponentProperty
	 */
	selectedText: string;

	/**
	 * 是否展開
	 *
	 * @type {boolean}
	 * @memberof valueComponentProperty
	 */
	isOpen: boolean;

}

const ValueComponent: React.FC<valueComponentProperty> = ({ selectedText, isOpen }) => (
	<div className={styles.dropdownSelectField}>
		<input
			type="text"
			disabled
			value={selectedText || ''}
		/>
		<div className={classnames(styles.icon, {
			[styles.rotate]: isOpen
		})}>
			<ExpandDown />
		</div>
	</div>
);

interface panelComponentProperty {

	/**
	 * 選項列表
	 *
	 * @type {OptionBase[]}
	 * @memberof panelComponentProperty
	 */
	options: OptionBase[],

	/**
	 * 選項變更時觸發的函式
	 *
	 * @memberof panelComponentProperty
	 */
	onChangeValue: (val: string) => void

}

const PanelComponent: React.FC<panelComponentProperty> = ({
	options = [],
	onChangeValue = () => {}
}) => (
	<ul className={styles.dropdownPanel}>
		{
			options.map(({ id, name }) => (
				<li key={id}>
					<div
						role="button"
						tabIndex={0}
						onKeyPress={() => {}}
						key={id}
						onClick={() => onChangeValue(id)}
					>
						{name}
					</div>
				</li>
			))
		}
	</ul>
);

interface DropdownSelectProperty {

	/**
	 * 下拉選項列表
	 *
	 * @type {OptionBase[]}
	 * @memberof DropdownSelectProperty
	 */
	options: OptionBase[],

	/**
	 * 選中的選項
	 *
	 * @type {OptionBase}
	 * @memberof DropdownSelectProperty
	 */
	selectedId: string,

	/**
	 * 變更選項時觸法的函式
	 *
	 * @memberof DropdownSelectProperty
	 */
	onChangeValue?: (val: string) => void,

}

const DropdownSelect: React.FC<DropdownSelectProperty> = ({
	options,
	selectedId,
	onChangeValue = () => {}
}) => {

	const selectOption = options.find(option => option.id === selectedId);
	const selectedText = selectOption ? selectOption.name : '';

	return (
		<Dropdown
			valueComponent={({ isOpen }) => (
				<ValueComponent
					selectedText={selectedText}
					isOpen={isOpen}
				/>
			)}
			panelComponent={() => (
				<PanelComponent
					options={options}
					onChangeValue={onChangeValue}
				/>
			)}
		/>
	);
};

export default DropdownSelect;
