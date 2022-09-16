import { useState } from 'react';
import { ValidatorType } from 'types/enum/validator-type';
import { FormControl, FormErrors } from 'types/interfaces/form-control';

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
	updateCtrlValidity: (key: keyof T) => void,

	/**
	 * 更新表單
	 *
	 */
	patchValue: (obj: Record<keyof T, unknown>) => void,

	/**
	 * 更新表單狀態
	 *
	 */
	updateValidity: () => void,

	/**
	 * 取的表單錯誤訊息
	 *
	 */
	getCtrlErrorMsg: (key: keyof T) => string,

}

const validateRequire = <D>(value: D): FormErrors => {

	const error = {
		[ValidatorType.REQUIRED]: true
	};

	switch (typeof value) {
		case 'string':
		case 'number':
			return !value.toString().trim() ? error : null;
		case 'boolean':
			return !value ? error : null;
		default:
			return null
	}

};

const validatorsMap = {
	[ValidatorType.REQUIRED]: validateRequire
};

// extends {[key: string]: FormControl}
/**
 * 建立表單的 Hook
 *
 * @template T - 表單型別
 * @param {T} initialForm - 表單初始值
 * @return {*}  {[Values<T>, Handlers]}
 */
const useForm = <T>(initialForm: T): [Values<T>, Handlers<T>] => {

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

	const updateCtrlValidity = (key: keyof T) => {

		let errObj = {};

		if ('options' in form[key]) {

			const formCtrl = (form[key] as unknown as FormControl);
			const formOption = formCtrl.options;

			if (
				!formOption ||
				!formOption.validators
			) {
				return;
			}

			formOption
				.validators
				.forEach(v => {
					if (validatorsMap[v]) {
						errObj = { ...errObj, ...validatorsMap[v](formCtrl.value) };
					}
				});

			setCtrlErrors(key, Object.keys(errObj).length > 0 ? errObj : null);
		}

	};

	const updateValidity = () => {
		Object
			.keys(form)
			.forEach(k => updateCtrlValidity(k as keyof T));
	};

	const getCtrlErrorMsg = (key: keyof T): string => {

		let errorMsg = '';
		const { errors } = (form[key] as unknown as FormControl);
		const firstErrorName = errors && Object.keys(errors)[0];

		switch(firstErrorName) {

			case ValidatorType.REQUIRED:
				errorMsg = '必填';
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
