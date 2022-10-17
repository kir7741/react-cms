import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import classnames from 'classnames';

import styles from './index.css';


export interface TextareaProperty extends TextareaHTMLAttributes<HTMLTextAreaElement> {

	/**
	 *  class 名稱
	 *
	 * @type {string}
	 * @memberof TextareaProperty
	 */
	className?: string;

	/**
	 * 錯誤訊息
	 *
	 * @type {string}
	 * @memberof TextareaProperty
	 */
	errorMsg?: string;

	/**
	 * 是否在 blur 時觸發檢核
	 *
	 * @type {boolean}
	 * @memberof TextareaProperty
	 */
	 validOnBlur?: boolean;

	 /**
		* 更新表單檢核狀態
		*
		* @memberof TextareaProperty
		*/
	 updateCtrlValidity?: () => void,

	 /**
		* change 時觸發的函式
		*
		* @memberof TextareaProperty
		*/
	 onChangeValue: (val: string | number) => void

	 /**
		* blur 時觸發的函式
		*
		* @memberof TextareaProperty
		*/
	 blur?: () => void

}

const Textarea: React.FC<TextareaProperty> = ({
	className,
	placeholder = '',
	value = '',
	errorMsg = '',
	validOnBlur = false,
	disabled,
	cols = 10,
	rows = 10,
	updateCtrlValidity = () => {},
	onChangeValue,
	blur = () => {}
}) => {

	const inInit = useRef(true);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		const val = e.target.value;
		onChangeValue(val);
	}

	useEffect(() => {

		if (inInit.current) {
			inInit.current = false;
			return;
		}

		if (!validOnBlur) {
			updateCtrlValidity();
		}

	}, [value])

	return (
		<div className={classnames(styles.textareaWrapper, className)}>
			<textarea
				cols={cols}
				rows={rows}
				disabled={disabled}
				className={classnames(styles.textarea, errorMsg && styles.error)}
				value={value}
				placeholder={placeholder}
				onBlur={() => {
					if (validOnBlur) {
						updateCtrlValidity();
					}
					blur();
				}}
				onChange={event => handleInputChange(event)}
			/>
			{errorMsg && <span>{errorMsg}</span>}
		</div>
	);

}

export default Textarea;
