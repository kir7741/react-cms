import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import Calendar from 'images/icon/calendar.inline.svg';
import Input from 'components/atoms/Input';
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

interface DatepickerProperty extends InputHTMLAttributes<HTMLInputElement> {

	/**
	 * 樣式的種類
	 *
	 * @type {Partial<StyleMap>}
	 * @memberof InputProperty
	 */
	styleMap?: Partial<StyleMap>;

	/**
	 * label 文字
	 *
	 * @type {string}
	 * @memberof DatepickerProperty
	 */
	labelText?: string;

	/**
	 * 錯誤訊息
	 *
	 * @type {string}
	 * @memberof DatepickerProperty
	 */
	errorMsg?: string;

	/**
	 * 是否在 blur 時觸發檢核
	 *
	 * @type {boolean}
	 * @memberof DatepickerProperty
	 */
	validOnBlur?: boolean;

	/**
	 * 更新表單檢核狀態
	 *
	 * @memberof DatepickerProperty
	 */
	updateCtrlValidity?: () => void,

	/**
	 * change 時觸發的函式
	 *
	 * @memberof DatepickerProperty
	 */
	onChangeValue: (val: string | number) => void

	/**
	 * blur 時觸發的函式
	 *
	 * @memberof DatepickerProperty
	 */
	blur?: () => void

}

const Datepicker: React.FC<DatepickerProperty> = ({
	styleMap = {},
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

	const isInit = useRef(true);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const val = e.target.value;
		onChangeValue(val);
	};

	const onFocus = () => {
		console.log('focus')
	}

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
		<div className={styles.datepicker}>
			<Input
				readOnly
				type="text"
				disabled={disabled}
				placeholder={placeholder}
				styleMap={styleMap}
				onChangeValue={onChangeValue}
				onFocus={onFocus}
			/>
			<div
				className={styles.icon}
				onKeyDown={() => {}}
				role="button"
				tabIndex={0}
				onClick={onFocus}
			>
				<Calendar />
			</div>
		</div>
	);
}

export default Datepicker;
