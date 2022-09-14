import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import classnames from 'classnames';
import useValidator from 'util/hook/useValidator';
import { FormErrors } from 'types/interfaces/form-control';
import { ValidatorType } from 'types/enum/validator-type';

import styles from './index.css';

interface InputProperty extends InputHTMLAttributes<HTMLInputElement> {

	/**
	 *  class 名稱
	 *
	 * @type {string}
	 * @memberof InputProperty
	 */
	className?: string;

	/**
	 * 輸入框類別
	 *
	 * @type {('text' | 'number' | 'password')}
	 * @memberof InputProperty
	 */
	type: 'text' | 'number' | 'password';

	/**
	 * 檢核列表
	 *
	 * @type {ValidatorType[]}
	 * @memberof InputProperty
	 */
	validators?: ValidatorType[];

	/**
	 * 錯誤訊息
	 *
	 * @type {string}
	 * @memberof InputProperty
	 */
	errorMsg?: string;

	/**
	 * 是否在 blur 時觸發檢核
	 *
	 * @type {boolean}
	 * @memberof InputProperty
	 */
	validOnBlur?: boolean;

	/**
	 * 更新表單檢核狀態
	 *
	 * @memberof InputProperty
	 */
	updateFormValid?: (errors: FormErrors) => void,

	/**
	 * change 時觸發的函式
	 *
	 * @memberof InputProperty
	 */
	onChangeValue: (val: string | number) => void

	/**
	 * blur 時觸發的函式
	 *
	 * @memberof InputProperty
	 */
	blur?: () => void

}

/**
 * 輸入框元件
 *
 * @param param0
 * @returns
 */
const Input: React.FC<InputProperty> = ({
	className,
	type,
	placeholder = '',
	value = '',
	validators = [],
	errorMsg = '',
	validOnBlur = false,
	disabled,
	updateFormValid = () => {},
	onChangeValue,
	blur = () => {}
}) => {

	const [errors, validate] = useValidator(validators, value);
	const isInit = useRef(true);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const val = e.target.value;
		onChangeValue(val);
	};

	useEffect(() => {

		if (isInit.current) {
			isInit.current = false;
			return;
		}

		if (!validOnBlur) {
			validate();
		}

	}, [value]);

	useEffect(() => {
		updateFormValid(errors);
	}, [errors]);

	return (
		<div className={classnames(styles.inputWrapper, className)}>
			<input
				type={type}
				disabled={disabled}
				placeholder={placeholder}
				className={classnames(styles.input, errorMsg && styles.error)}
				value={value}
				onBlur={() => {
					validate();
					blur();
				}}
				onChange={e => handleInputChange(e)}
			/>
			{errorMsg && <span>{errorMsg}</span>}
		</div>
	);

};

export default Input;
