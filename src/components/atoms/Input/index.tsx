import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import classnames from 'classnames';
import styles from './index.css';

/**
 * 樣式的介面
 *
 * @interface StyleMap
 */
interface StyleMap {
	inputField: string;
	label: string;
	inputWrapper: string;
	input: string;
	error: string;
}

export interface InputProperty extends InputHTMLAttributes<HTMLInputElement> {

	/**
	 * 樣式的種類
	 *
	 * @type {Partial<StyleMap>}
	 * @memberof InputProperty
	 */
	styleMap?: Partial<StyleMap>;

	/**
	 * 輸入框類別
	 *
	 * @type {('text' | 'number' | 'password')}
	 * @memberof InputProperty
	 */
	type?: 'text' | 'number' | 'password';

	/**
	 * label 文字
	 *
	 * @type {string}
	 * @memberof InputProperty
	 */
	labelText?: string;

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
	updateCtrlValidity?: () => void,

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
	styleMap = {},
	type = 'text',
	placeholder = '',
	value = '',
	labelText = '',
	errorMsg = '',
	validOnBlur = false,
	disabled,
	updateCtrlValidity = () => {},
	onChangeValue,
	blur = () => {}
}) => {

	console.log('errorMsg', errorMsg);

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
			updateCtrlValidity();
		}

	}, [value]);

	return (
		<div className={classnames(styles.inputField, styleMap.inputField, {
			[styles.full]: !labelText
		})}>
			{labelText && (
				<div className={classnames(styles.label, styleMap.label)}>
					{labelText}
				</div>
			)}
			<div className={classnames(styles.inputWrapper, styleMap.inputWrapper)}>
				<input
					type={type}
					disabled={disabled}
					placeholder={placeholder}
					className={classnames(styles.input, styleMap.input, errorMsg && styles.error, errorMsg && styleMap.error)}
					value={value}
					onBlur={() => {
						if (validOnBlur) {
							updateCtrlValidity();
						}
						blur();
					}}
					onChange={e => handleInputChange(e)}
				/>
				{errorMsg && <span>{errorMsg}</span>}
			</div>
		</div>
	);

};

export default Input;
