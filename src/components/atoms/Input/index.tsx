import React, { InputHTMLAttributes } from 'react';
import classnames from 'classnames';
import { FormControl } from 'types/interfaces/form-control';
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
	 * change 時觸發的函式
	 *
	 * @memberof InputProperty
	 */
	onChangeValue: (ctrl: FormControl<string | number>) => void

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
	errorMsg = '',
	validOnBlur = false,
	disabled,
	onChangeValue,
	blur
}) => {

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const val = e.target.value;
		const formCtrlVal: FormControl<string | number> = {
			value: val,
			errors: null
		};

		if (!validOnBlur) {
			// TODO: do Validator
			formCtrlVal.errors = {}
		}

		onChangeValue(formCtrlVal);
	}

	return (
		<div className={classnames(styles.inputWrapper, className)}>
			<input
				type={type}
				disabled={disabled}
				placeholder={placeholder}
				className={classnames(styles.input, errorMsg && styles.error)}
				value={value}
				onBlur={blur}
				onChange={e => handleInputChange(e)}
			/>
			{errorMsg && <span>{errorMsg}</span>}
		</div>
	);

};

export default Input;
