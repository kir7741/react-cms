import { useState } from 'react';

type Values<T> = {
	form: T;
};

type Handlers = {

	/**
	 * 更新單一欄位的值
	 *
	 */
	setValue: <T>(key: string, val: T) => void
}

const useForm = <T>(initialForm: T): [Values<T>, Handlers] => {

	const [form, setForm] = useState(initialForm);

	const setValue = <R>(key: string, val: R) => {
		setForm(pre => ({ ...pre, [key]: val }));
	}

	return [
		{
			form
		},
		{
			setValue
		}
	];

};

export default useForm;
