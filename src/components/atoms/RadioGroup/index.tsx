import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { OptionBase } from 'types/interfaces/option-base';

import styles from './index.css';

interface RadioProperty extends InputHTMLAttributes<HTMLInputElement> {

	/**
	 * radio選項
	 *
	 * @type {OptionBase}
	 * @memberof RadioProperty
	 */
	option: OptionBase;

	/**
	 * class 名稱
	 *
	 * @type {string}
	 * @memberof RadioProperty
	 */
	className?: string;

	/**
	 * change 時觸發的函式
	 *
	 * @memberof RadioProperty
	 */
	onChangeValue: (val: string) => void,

}

interface RadioGroupProperty {

	/**
	 * radioGroup 為 radio 外層樣式
	 * radio 為 radio 外層樣式
	 *
	 * @type {(Record<'radio' | 'radioGroup', string>)}
	 * @memberof RadioGroupProperty
	 */
	styleMap: Record<'radio' | 'radioGroup', string>;

	/**
	 * 錯誤訊息
	 *
	 * @type {string}
	 * @memberof RadioGroupProperty
	 */
	errorMsg?: string,

	/**
	 * 當前選選擇的選項 id
	 *
	 * @type {string}
	 * @memberof RadioGroupProperty
	 */
	value: string,

	/**
	 * 選項列表
	 *
	 * @type {OptionBase[]}
	 * @memberof RadioGroupProperty
	 */
	options: OptionBase[],

	/**
	 * 是否 disable 元素
	 *
	 * @type {boolean}
	 * @memberof RadioGroupProperty
	 */
	disabled?: boolean,

	/**
	 * radio Group 名字
	 *
	 * @type {string}
	 * @memberof RadioGroupProperty
	 */
	name: string;

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
	onChangeValue: (val: string) => void,

}

const Radio: React.FC<RadioProperty> = ({
	className,
	option,
	name = '',
	disabled,
	checked,
	onChangeValue = () => {}
}) => {

	const handelRadioChange = () => {
		onChangeValue(option.id);
	};

	return (
		<div className={classnames(styles.radioWrapper, className)}>
			<input
				type="radio"
				name={name}
				id={option.id}
				checked={checked}
				disabled={disabled}
				onChange={handelRadioChange}
			/>
			<label htmlFor={option.id}>
				{option.name}
			</label>
		</div>
	);

}

const RadioGroup: React.FC<RadioGroupProperty> = ({
	styleMap,
	disabled,
	value = '',
	name = '',
	errorMsg = '',
	options = [],
	updateCtrlValidity = () => {},
	onChangeValue = () => {},
}) => {

	const isInit = useRef(true);

	useEffect(() => {
		if (isInit.current) {
			isInit.current = false;
			return;
		}

		updateCtrlValidity();

	}, [value]);

	return (
		<>
			<div className={classnames(styles.radioGroup, styleMap.radioGroup)}>
				{
					options.map(item => (
						<Radio
							className={classnames(styleMap.radio)}
							name={name}
							key={item.id}
							option={item}
							disabled={disabled}
							checked={value === item.id}
							onChangeValue={onChangeValue}
						/>
					))
				}
			</div>
			{errorMsg && <span>{errorMsg}</span>}
		</>
	);

}

export { Radio, RadioGroup };
