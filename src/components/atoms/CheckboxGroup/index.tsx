import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import classnames from 'classnames';

import styles from './index.css';

interface CheckboxProperty extends InputHTMLAttributes<HTMLInputElement> {

	/**
	 * checkbox選項名稱
	 *
	 * @type {string}
	 * @memberof CheckboxProperty
	 */
	labelText: string;

	/**
	 * class 名稱
	 *
	 * @type {string}
	 * @memberof CheckboxProperty
	 */
	className?: string;

	/**
	 * change 時觸發的函式
	 *
	 * @memberof RadioProperty
	 */
	onChangeValue: (boolean: boolean) => void,

}

interface CheckboxGroupProperty {

	/**
	 * checkboxGroup 為 checkbox 外層樣式
	 * checkbox 為 checkbox 外層樣式
	 *
	 * @type {(Record<'checkbox' | 'checkboxGroup', string>)}
	 * @memberof CheckboxGroupProperty
	 */
	styleMap: Partial<Record<'checkbox' | 'checkboxGroup', string>>;

	/**
	 * 錯誤訊息
	 *
	 * @type {string}
	 * @memberof CheckboxGroupProperty
	 */
	errorMsg?: string;

	/**
	 * 是否 disalbed 表單元件
	 *
	 * @type {boolean}
	 * @memberof CheckboxGroupProperty
	 */
	disabled?: boolean

	/**
	 *  當前選擇的值
	 *
	 * @type {boolean[]}
	 * @memberof CheckboxGroupProperty
	 */
	value: boolean[];

	/**
	 * 選項
	 *
	 * @type {string}
	 * @memberof CheckboxGroupProperty
	 */
	options: string[];

	/**
	 * 更新表單檢核狀態
	 *
	 * @memberof RadioGroupProperty
	 */
	updateCtrlValidity?: () => void,

	/**
	 * change 時觸發的函式
	 *
	 * @memberof RadioGroupProperty
	 */
	onGroupChangeValue: (val: boolean[]) => void,

}

const Checkbox: React.FC<CheckboxProperty> = ({
	className,
	labelText,
	disabled,
	checked,
	onChangeValue = () => {}
}) => {

	const handleCheckboxChange = () => {
		onChangeValue(!checked);
	};

	return (
		<div className={classnames(styles.checkboxWrapper, className)}>
			<input
				disabled={disabled}
				checked={checked}
				type="checkbox"
				id={labelText}
				name={labelText}
				onChange={handleCheckboxChange}
			/>
			<label htmlFor={labelText}>{labelText}</label>
		</div>
	);

}

const CheckboxGroup: React.FC<CheckboxGroupProperty> = ({
	styleMap = {},
	disabled,
	value = [],
	errorMsg = '',
	options = [],
	updateCtrlValidity = () => {},
	onGroupChangeValue = () => {},
}) => {

	const isInit = useRef(true);

	const checkboxValueChange = (val: boolean, index: number) => {
		const newValArray = [...value];
		newValArray[index] = val;
		onGroupChangeValue(newValArray);
	}

	useEffect(() => {
		if (isInit.current) {
			isInit.current = false;
			return;
		}

		updateCtrlValidity();

	}, [value])

	return (
		<>
			<div className={classnames(styles.checkboxGroup, styleMap.checkboxGroup)}>
				{
					options.map((item, index) => (
						<Checkbox
							className={classnames(styleMap.checkbox)}
							labelText={item}
							key={item}
							id={item}
							disabled={disabled}
							checked={value[index]}
							onChangeValue={val => checkboxValueChange(val, index)}
						/>
					))
				}
			</div>
			{errorMsg && <span>{errorMsg}</span>}
		</>
	);

}

export {CheckboxGroup, Checkbox};
