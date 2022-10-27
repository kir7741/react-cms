import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import classnames from 'classnames';

import styles from './index.css';

interface RadioProperty extends InputHTMLAttributes<HTMLInputElement> {

	/**
	 * 選項名稱
	 *
	 * @type {string}
	 * @memberof RadioProperty
	 */
	labelText?: string;

	/**
	 * class 名稱
	 *
	 * @type {string}
	 * @memberof RadioProperty
	 */
	className?: string;

	/**
	 * 當前 radio 的值
	 *
	 * @type {string}
	 * @memberof RadioProperty
	 */
	value: string;

	/**
	 * change 時觸發的函式
	 *
	 * @memberof RadioProperty
	 */
	onChangeValue: (val: string | number) => void,

}

interface RadioGroupProperty {

	/**
	 * class 名稱
	 *
	 * @type {string}
	 * @memberof RadioGroupProperty
	 */
	className?: string,

	/**
	 * 錯誤訊息
	 *
	 * @type {string}
	 * @memberof RadioGroupProperty
	 */
	errorMsg?: string,

	/**
	 * 選項資料
	 *
	 * @type {string}
	 * @memberof RadioGroupProperty
	 */
	value: string,

	/**
	 * 子層元件
	 *
	 * @type {React.ReactNode}
	 * @memberof RadioGroupProperty
	 */
	children: React.ReactNode

	/**
	 * 更新表單檢核狀態
	 *
	 * @memberof RadioGroupProperty
	 */
	updateCtrlValidity?: () => void,
}

const Radio: React.FC<RadioProperty> = ({
	labelText,
	className,
	name = '',
	value = '',
	disabled,
	onChangeValue = () => {}
}) => {

	const handelRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		onChangeValue(val);
	}

	return (
		<div className={classnames(styles.radioWrapper, className)}>
			<input
				type="radio"
				id={value}
				name={name}
				disabled={disabled}
				className={classnames(styles.radio)}
				value={value}
				onChange={e => handelRadioChange(e)}
			/>
			<label
				htmlFor={value}
				className={classnames(styles.radioGraph,className)}
			>
				{labelText}
			</label>
		</div>
	);

}

const RadioGroup: React.FC<RadioGroupProperty> = ({
	className,
	value = '',
	errorMsg = '',
	updateCtrlValidity = () => {},
	children
}) => {

	const isInit = useRef(true);

	useEffect(() => {

		if (isInit.current) {
			isInit.current = false;
			return;
		}

		updateCtrlValidity();

	}, [value])


	return (
		<>
			<div
				className={classnames(styles.radioGroup, className)}
			>
				{children}
			</div>
			{errorMsg && <span>{errorMsg}</span>}
		</>
	);

}

export { Radio, RadioGroup };
