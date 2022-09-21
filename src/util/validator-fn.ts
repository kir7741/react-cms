import { ValidatorType } from 'types/enum/validator-type';
import { FormErrors } from 'types/interfaces/form-control';

export class Validators {

	/**
	 * 必填檢核
	 *
	 * @static
	 * @param {D} value
	 * @memberof Validators
	 */
	static require = <D>(value: D): FormErrors => {

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

	/**
	 * 正則檢核
	 *
	 * @static
	 * @param {RegExp} reg - 正則
	 * @memberof Validators
	 */
	static pattern = (reg: RegExp) => <D>(value: D): FormErrors => {

		const newVal = String(value);

		if (!newVal) {
			return null;
		}

		const error = {
			[ValidatorType.PATTERN]: reg
		};
		const result = reg.test(newVal);

		return result ? null : error;

	}

}
