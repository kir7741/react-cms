import { useState } from 'react';
import { ValidatorType } from 'types/enum/validator-type';
import { FormControl, FormErrors } from 'types/interfaces/form-control';
import { Validators } from 'util/validator-fn';

type Values<T> = {
	form: T;
};

type Handlers<T> = {

	/**
	 * 設定單一欄位的資料
	 *
	 */
	setCtrlValue: <D>(key: keyof T, val: D) => void,

	/**
	 * 更新單一欄位的錯誤狀態
	 *
	 */
	setCtrlErrors: (key: keyof T, errors: FormErrors) => void,

	/**
	 * 更新單一欄位的檢核狀態
	 *
	 */
	updateCtrlValidity: (key: keyof T) => FormErrors | null,

	/**
	 * 更新表單
	 *
	 */
	patchValue: (obj: Record<keyof T, unknown>) => void,

	/**
	 * 更新表單狀態
	 *
	 */
	updateValidity: () => boolean,

	/**
	 * 取的表單錯誤訊息
	 *
	 */
	getCtrlErrorMsg: (key: keyof T) => string,

}

const validatorsMap: Record<string, <D>(value: D) => FormErrors> = {
	[ValidatorType.REQUIRED]: Validators.require
};

/**
 * 建立表單的 Hook
 *
 * @template T - 表單型別
 * @param {T} initialForm - 表單初始值
 * @return {*}  {[Values<T>, Handlers]}
 */
const useForm = <T extends {[key: string]: FormControl}>(initialForm: T): [Values<T>, Handlers<T>] => {

	const [form, setForm] = useState(initialForm);

	const setCtrlValue = <D>(key: keyof T, value: D) => {
		setForm(pre => ({ ...pre, [key]: { ...pre[key], value } }));
	};

	const setCtrlErrors = (key: keyof T, errors: FormErrors) => {
		setForm(pre => ({ ...pre, [key]: { ...pre[key], errors } }));
	};

	const patchValue = (obj: Record<keyof T, unknown>) => {
		setForm(pre => ({ ...pre, ...obj }));
	};

	const updateCtrlValidity = (key: keyof T): FormErrors | null => {

		let errObj = {};

		const formOption = form[key].options;

		if (
			!formOption ||
			!formOption.validators
		) {
			return null;
		}

		formOption
			.validators
			.forEach(v => {

				if (typeof v === 'function') {
					errObj = { ...errObj, ...v(form[key].value) };
				} else if (validatorsMap[v]) {
					errObj = { ...errObj, ...validatorsMap[v](form[key].value) };
				}

			});

		const finalErrors = Object.keys(errObj).length > 0 ? errObj : null;

		setCtrlErrors(key, finalErrors);

		return finalErrors;

	};

	const updateValidity = (): boolean => {

		let isValid = true;

		Object
			.keys(form)
			.forEach(k => {
				const errors = updateCtrlValidity(k as keyof T);
				if (errors) {
					isValid = false;
				}
			});

		return isValid;

	};

	const getCtrlErrorMsg = (key: keyof T): string => {

		let errorMsg = '';
		const { errors } = form[key];
		const firstErrorName = errors && Object.keys(errors)[0];

		switch(firstErrorName) {

			case ValidatorType.REQUIRED:
				errorMsg = '必填';
				break;

			case ValidatorType.PATTERN:
				errorMsg = '格式錯誤';
				break;

			default:
				break;

		}

		return errorMsg;

	};

	return [
		{
			form
		},
		{
			updateCtrlValidity,
			setCtrlValue,
			setCtrlErrors,
			patchValue,
			updateValidity,
			getCtrlErrorMsg
		}
	];

};

export default useForm;
