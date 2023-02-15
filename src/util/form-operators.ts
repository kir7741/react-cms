import { ValidatorType } from "types/enum/validator-type";
import { FormControl, FormErrors } from "types/interfaces/form-control";
import validatorsMap from "types/constants/validators-map";

const setCtrlValue = <T, R>(form: T, ctrlName: keyof T, value: R): Partial<T> => ({
	[ctrlName]: {
		...form[ctrlName],
		value
	}
} as Partial<T>);

const setCtrlErrors = <T>(form: T, ctrlName: keyof T, errors: FormErrors): Partial<T> => ({
	[ctrlName]: {
		...form[ctrlName],
		errors
	}
} as Partial<T>);

const getCtrlErrors = <T>(form: T, ctrlName: keyof T): FormErrors | null => {

	let errObj = {};

	const formControl = form[ctrlName] as FormControl;
	const { options: formOption } = formControl;

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
				errObj = { ...errObj, ...v(formControl.value) };
			} else if (validatorsMap[v]) {
				errObj = { ...errObj, ...validatorsMap[v](formControl.value) };
			}

		});

	const finalErrors = Object.keys(errObj).length > 0 ? errObj : null;

	return finalErrors;

};

const updateCtrlValidity = <T>(form: T, ctrlName: keyof T): Partial<T> => {
	const errors = getCtrlErrors(form, ctrlName);
	return setCtrlErrors(form, ctrlName, errors);
};

const isFormValid = <T extends object>(form: T): boolean => {

	let formValid = true;
	const list = 	Object.keys(form);

	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < list.length; i++) {
		const ctrlName = list[i];
		const errors = getCtrlErrors(form, ctrlName as keyof T);
		if (errors) {
			formValid = false;
			break;
		}
	}

	return formValid;

};

const getCtrlErrorMsg = (errors: FormErrors): string => {

	let errorMsg = '';
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

export {
	setCtrlValue,
	setCtrlErrors,
	getCtrlErrorMsg,
	updateCtrlValidity,
	isFormValid
};
