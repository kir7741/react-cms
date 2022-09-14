import { useState } from 'react';
import { FormErrors } from 'types/interfaces/form-control';

type Values<T> = {
	form: T;
};

type Handlers = {

	/**
	 * 更新單一欄位的值
	 *
	 */
	setValue: <D>(key: string, val: D) => void,

	/**
	 * 更新單一欄位的錯誤狀態
	 *
	 */
	setErrors: (key: string, errors: FormErrors) => void
}

/**
 * 建立表單的 Hook
 *
 * @template T - 表單型別
 * @param {T} initialForm - 表單初始值
 * @return {*}  {[Values<T>, Handlers]}
 */
const useForm = <T>(initialForm: T): [Values<T>, Handlers] => {

	const [form, setForm] = useState(initialForm);

	const setValue = <D>(key: string, val: D) => {
		setForm(pre => ({ ...pre, [key]: { ...pre[key as keyof T], value: val } }));
	};

	const setErrors = (key: string, errors: FormErrors) => {
		setForm(pre => ({ ...pre, [key]: { ...pre[key as keyof T], errors } }));
	};

	return [
		{
			form
		},
		{
			setValue,
			setErrors
		}
	];

};

export default useForm;
