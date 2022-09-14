import { useState } from 'react';
import { ValidatorType } from 'types/enum/validator-type';
import { FormErrors } from 'types/interfaces/form-control';

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

/**
 * 檢核 Hook
 *
 * @template D - 欄位的資料型別
 * @param {ValidatorType[]} validators - 檢核列表
 * @param {D} value - 欄位的值
 * @return {*}  {[FormErrors, () => void]}
 */
const useValidator = <D>(validators: ValidatorType[], value: D): [FormErrors, () => void] => {

	const [errors, setError] = useState<FormErrors>(null);

	const validate = () => {

		setError(null);
		let errObj = {};

		validators.forEach(v => {
			if (validatorsMap[v]) {
				errObj = { ...errObj, ...validatorsMap[v](value) };
			}
		});

		setError(() => (Object.keys(errObj).length > 0 ? errObj : null));

	}

	return [errors, validate]

};

export default useValidator;
