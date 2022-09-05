import { useState } from 'react';
import { FormControl } from 'types/interfaces/form-control';

type Values<T> = {
	form: T;
};

type Handlers = {

	/**
	 * 更新單一欄位的值
	 *
	 */
	setValue: <D>(key: string, val: FormControl<D>) => void
}

const useForm = <T>(initialForm: T): [Values<T>, Handlers] => {

	const [form, setForm] = useState(initialForm);

	const setValue = <D>(key: string, val: FormControl<D>) => {
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
