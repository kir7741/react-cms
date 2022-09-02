import React, { InputHTMLAttributes } from 'react';
import classnames from 'classnames';

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
	errorMsg = '',
	disabled,
	onChangeValue,
	blur
}) => {

	console.log('input');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const val = e.target.value;
		onChangeValue(val);
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
