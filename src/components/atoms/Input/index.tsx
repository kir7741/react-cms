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
	change?: () => void

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
	errorMsg = '',
	disabled,
	change,
	blur
}) => (
	<div className={classnames(styles.inputWrapper, className)}>
		<input
			type={type}
			disabled={disabled}
			placeholder={placeholder}
			className={classnames(styles.input, errorMsg && styles.error)}
			onBlur={blur}
			onChange={change}
		/>
		{errorMsg && <span>{errorMsg}</span>}
	</div>
);

export default Input;
